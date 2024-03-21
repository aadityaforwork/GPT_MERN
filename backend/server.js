const express = require('express');
require('dotenv').config();
const cron = require('node-cron');
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/usersRouter');
const connectDB = require('./utils/connectDB');
const { errorHandler } = require('./middlewares/errorMiddleware');
const openAIRouter = require('./routes/openAIRouter');
const stripeRouter = require('./routes/stripeRouter');
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

//Cron for the trial period 
//Cron for the paid one

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