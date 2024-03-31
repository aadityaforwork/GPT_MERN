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
    subscriptionPlan:{
        type:String,
        enum:['Trial','Premium','Free','Basic'],
        default:'Trial',
    },
    apiRequestCount:{
        type:Number,
        default:0,
    },
    monthlyRequestCount:{
        type:Number,
        default:10,//100 credits for the user which needs to use within 3 days
    },
    nextBillingDate:Date,
    payments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Payment"
        }
    ],
    contentHistory:[
        {
          type:mongoose.Schema.Types.ObjectId,
          ref:"ContentHistory"
        },
    ],
},
{
    timestamps:true,
    toJSON:{
        virtuals:true,
    },
    toObject:{
        virtuals:true,
    }
})   


//!Compile to form model
const User = mongoose.model('User',userSchema);
module.exports = User;