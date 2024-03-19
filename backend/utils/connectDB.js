const mongoose = require('mongoose');
const connectDB = async () => {
 try {
    const connect = await mongoose.connect("mongodb+srv://aadityamalani:Am150205@cluster0.oipq8ef.mongodb.net/gpt?retryWrites=true&w=majority");
    console.log(`MongoDB connected: ${connect.connection.host}`);
 } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
 }
};
module.exports = connectDB;
