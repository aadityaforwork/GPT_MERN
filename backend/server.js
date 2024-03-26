const express = require('express');
require('dotenv').config();
const cron = require('node-cron');
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/usersRouter');
const connectDB = require('./utils/connectDB');
const { errorHandler } = require('./middlewares/errorMiddleware');
const openAIRouter = require('./routes/openAIRouter');
const stripeRouter = require('./routes/stripeRouter');
const User = require('./models/User');
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

//Cron for the trial period : every single day
cron.schedule("0 0 * * * *",async () =>{
  // console.log("Running a task every minute");
  try {
    //GET THE CURRENT DATE
    const currentDate = new Date();
    const udpatedUser = await User.updateMany({
      trialActive:true,
      trialExpires:{$lt:currentDate}
    },
    {
      trialActive:false,
      subscriptionPlan:"Free",
      monthlyRequestCount:5,
    })
    // console.log(udpatedUser);
  } catch (error) {
    console.log(error);
  }
})

//Cron for the paid one
//Cron for the free one
cron.schedule("0 0 1 * * *",async () =>{
  // console.log("Running a task every minute");
  try {
    //GET THE CURRENT DATE
    const currentDate = new Date();
    await User.updateMany({
      subscriptionPlan:'Free',
      nextBillingDate:{$lt:currentDate}
    },
    {
      monthlyRequestCount:0,
    })
    // console.log(udpatedUser);
  } catch (error) {
    console.log(error);
  }
})

//Cron for the basic one
cron.schedule("0 0 1 * * *",async () =>{
  // console.log("Running a task every minute");
  try {
    //GET THE CURRENT DATE
    const currentDate = new Date();
    await User.updateMany({
      subscriptionPlan:'Basic',
      nextBillingDate:{$lt:currentDate}
    },
    {
      monthlyRequestCount:0,
    })
    // console.log(udpatedUser);
  } catch (error) {
    console.log(error);
  }
})

//Cron for the Premium one
cron.schedule("0 0 1 * * *",async () =>{
  // console.log("Running a task every minute");
  try {
    //GET THE CURRENT DATE
    const currentDate = new Date();
    await User.updateMany({
      subscriptionPlan:'Premium',
      nextBillingDate:{$lt:currentDate}
    },
    {
      monthlyRequestCount:0,
    })
    // console.log(udpatedUser);
  } catch (error) {
    console.log(error);
  }
})

//middlewares
app.use(express.json());
app.use(cookieParser());


//Routes
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/openai', openAIRouter);
app.use('/api/v1/stripe', stripeRouter);


//error handler
app.use(errorHandler);


app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});