const express = require('express');
require('dotenv').config();
const usersRouter = require('./routes/usersRouter');
const connectDB = require('./utils/connectDB');
const { errorHandler } = require('./middlewares/errorMiddleware');
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
//Routes
app.use('/api/v1/users', usersRouter);
//error handler
app.use(errorHandler);
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});