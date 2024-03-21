const asyncHandler = require('express-async-handler');
const { calculateNextBillingDate } = require('../utils/calculateNextBillingDate');
const { shouldRenewSubcriptionPlan } = require('../utils/shouldRenewSubcriptionPlan');
const Payment = require('../models/Payment');
const User = require('../models/User');
const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY);
//Stripe Payment
const handleStripePayment = asyncHandler(async (req, res) => {
    const {amount,subscriptionPlan}=req.body;
    //get the user
    const user = req?.user;
    try {
        //Create Payment 
        const paymentIntent = await stripe.paymentIntents.create({
            amount : Number(amount)*100,
            currency:'usd',
            metadata:{
                userId:user?._id?.toString(),
                userEmail:user?.email,
                subscriptionPlan,
            },
        });
    //send the response
    res.json({
        clientSecret:paymentIntent?.client_secret,
        paymentIntentId:paymentIntent?.id,
        metadata:paymentIntent?.metadata,
    
    })
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error});
    }
})

//verify payment
const verifyPayment = asyncHandler(async (req, res) => {
    const {paymentIntentId}=req.params;
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        console.log(paymentIntent);
        if(paymentIntent?.status!=="succeeded")
        {
           //get the info metadata
           const metadata = paymentIntent?.metadata;
           const subscriptionPlan = metadata?.subscriptionPlan;
           const userEmail = metadata?.userEmail;
           const userId = metadata?.userId;
           //find the user
           const userFound= await User.findById(userId);
           if(!userFound)
           {
               return res.status(404).json({message:"User not found"});
           }
           //get the payment details
           const amount = paymentIntent?.amount/100;
           const currency = paymentIntent?.currency;
           const paymentIntentId = paymentIntent?.id;
           //create the payment history
           const newPayment = await Payment.create({
            user:userId,
            email:userEmail,
            subscriptionPlan,
            amount,
            currency,
            status:paymentIntent?.status,
            reference:paymentIntentId,
           })
           //check for the subscription plan
           if(subscriptionPlan==='Basic')
           {
                const updatedUser = await User.findByIdAndUpdate(userId,{ 
                    subscriptionPlan,
                    monthlyRequestCount:50,
                    apiRequestCount:0,
                    nextBillingDate:calculateNextBillingDate(),
                    trialPeriod:0,
                    $addToSet:{payments:newPayment?._id},
                    subscriptionPlan:'Basic'
                });
                res.json({status:true,message:"Payment has been verified successfully",updatedUser});
           }
           if(subscriptionPlan==='Premium')
           {
                const updatedUser = await User.findByIdAndUpdate(userId,{ 
                    subscriptionPlan,
                    monthlyRequestCount:100,
                    apiRequestCount:0,
                    nextBillingDate:calculateNextBillingDate(),
                    trialPeriod:0,
                    $addToSet:{payments:newPayment?._id},
                    subscriptionPlan:'Premium'
                });
                res.json({status:true,message:"Payment has been verified successfully",updatedUser});
           }
        //  res.json({status:true,message:"Payment has been verified successfully",updatedUser});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error});
    }
})

//Handling Free Subscription
const handleFreeSubscription = asyncHandler(async (req, res) => {
    // console.log("free plan")
    //*Get the Login User
    const user =req?.user;
    // console.log(user);
    //*Check if the user account should be renewed or not
    try {
        if (shouldRenewSubcriptionPlan(user))
        {

            //*Update the user account
            user.subscriptionPlan="Free";
            user.monthlyRequestCount=5;
            user.apiRequestCount=0;
            //*Calculate the next billing date
            user.nextBillingDate = calculateNextBillingDate();
            //*Create new payment and save into db
            const newPayment = await Payment.create({
                user:user?._id,
                amount:0,
                subscriptionPlan:"Free",
                status:"Success",
                reference:Math.random().toString(36).substring(7),
                monthlyRequestCount:5,
                currency:"usd",
            });
            user.payments.push(newPayment?._id);
            //*Save the user account
            await user.save();
            //*send the response
            res.json({message:"User account has been updated successfully",user});
            
        }
        else
        {
            return res.status(400).json({message:"User account is not expired yet"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error});
    }
   
})



module.exports = { handleStripePayment,handleFreeSubscription,verifyPayment };