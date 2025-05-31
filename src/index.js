import dotenv from 'dotenv';
import connectDB from './db/index.js';

dotenv.config(); // No need for path if file is named `.env`

connectDB();




















/*
import express from 'express';
const app = express();
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process with failure
  }
}
  */
