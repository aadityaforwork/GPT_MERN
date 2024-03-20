const asyncHandler = require('express-async-handler');
const jwt= require('jsonwebtoken');
const User = require('../models/User');
const isAuthenticated = asyncHandler(async (req, res, next) => {
    if(req.cookies.token)
    {
        //!Verify the token
       const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
       //adding the user 
       req.user = await User.findById(decoded.id).select('-password');
       return next();
    }
    else{
        res.status(401);
        throw new Error('Not authorized, no token');
    }
})


module.exports = isAuthenticated;