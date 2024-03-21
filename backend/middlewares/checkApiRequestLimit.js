const asyncHandler = require("express-async-handler");
const User = require("../models/User");


const checkApiRequestLimit = asyncHandler(async (req, res, next) => {
    if(!req.user){
        res.status(401).json({message:"Not Authorised"});
    }

    //*Find the User
    const user = await User.findById(req?.user?._id);
    if(!user){
        res.status(404).json({message:"User not found"});
    }
    let requestLimit=0;
    //*check if the user is on trial period
    if(user?.trialActive)
    {
        requestLimit=user?.monthlyRequestCount;
    }
    // console.log(requestLimit);
    if(user?.apiRequestCount>=requestLimit)
    {
        throw new Error('You have reached your monthly request limit , please upgrade your plan to continue using the service.');
    }
    next();
})

module.exports = { checkApiRequestLimit };