const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

//Registration
const register = asyncHandler(
  async (req, res) => {
      const {username, email, password} = req.body;
      //Validate
      if(!username || !email || !password)
      {
          res.status(400)
          throw new Error('Please fill all the fields');
      }
      //Check if user already exists
      const userExists = await User.findOne({email});
      if(userExists)
      {
          res.status(400)
          throw new Error('User already exists');
      }
      //Hash the user password
      const salt= await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      //create the user
      const newUser = new User({
          username,
          email,
          password:hashedPassword
      });

      //Add the date the trial will expire
      newUser.trialExpires = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

      //Save the user
      await newUser.save();
      res.json
      ({
         message: 'Registration succesful',
         status:true,
         user:{
          username,
          email,
         }
      });
    }
)


//Login
const login = asyncHandler(async (req, res) => {
   const {email, password} = req.body;
   //check for user email
   const user = await User.findOne({email});
   if(!user)
   {
       res.status(401);
       throw new Error('Invalid email or password');
   }
   //check if password is correct
   const isMatch = await bcrypt.compare(password, user && user.password);
   if(!isMatch)
   {
       res.status(401);
       throw new Error('Invalid email or password');
   }
   //Generate token using jwt
   const token=jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
   console.log(token);
   //set the token in the cookie(http only)
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge:  24 * 60 * 60 * 1000 //7 days
    });

   //send the response
   res.json({
       message: 'Login successful',
       status: 'success',
       _id: user?._id,
        username: user?.username,
        email: user?.email,
   });
});


//Logout
const logout=asyncHandler(async(req, res)=>{
   res.cookie('token',{},{maxAge:1});
   res.status(200).json({
       message:'Logged out successfully'
   });
});


//Profile
const userProfile=asyncHandler(async(req, res)=>{
    // console.log(req.user);
    const user = await User.findById(req?.user?.id).select('-password');
    if(user)
    {
        res.status(200).json
        ({
          status: 'success',
          user,
        })
    }
    else
    {
      res.status(404);
      throw new Error('User not found');
    }
})
//Check User Auth Status


module.exports={register,login,logout,userProfile}