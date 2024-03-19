const mongoose = require('mongoose');

//Schemas
const paymentSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    reference:{
        type:String,
        required:true,
    },
    currency:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:pending,
        required:true,
    },
    subscriptionPlan:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    // monthlyRequestCount:{
    //     type:Number,
    //     required:true,
    // },
},
{
    timestamps:true,
})   

//!Compile to form model
const Payment = mongoose.model('Payment',userSchema);
module.exports = Payment;