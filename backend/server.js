const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/usersRouter');
const connectDB = require('./utils/connectDB');
const { errorHandler } = require('./middlewares/errorMiddleware');
const openAIRouter = require('./routes/openAIRouter');
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
//Routes
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/openai', openAIRouter);
//error handler
app.use(errorHandler);
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});