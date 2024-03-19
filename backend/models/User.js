const mongoose = require('mongoose');

//Schemas
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    trialPeriod:{
        type:Number,
        default:3,
    },
    trialActive:{
        type:Boolean,
        default:true,
    },
    trialExpires:{
        type:Date,
    },
    subscription:{
        type:Boolean,
        enum:['Trial','Premium','Free','Basic']
    },
    apiRequestCount:{
        type:Number,
        default:0,
    },
    monthlyRequestCount:{
        type:Number,
        default:0,
    },
    nextBillingDate:Date,
    payments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Payment"
        }
    ],
    history:[
        {
          type:mongoose.Schema.Types.ObjectId,
          ref:"History"
        },
    ],
},
{
    timestamps:true,
})   

//!Compile to form model
const User = mongoose.model('User',userSchema);
module.exports = User;