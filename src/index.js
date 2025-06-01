import dotenv from 'dotenv';
import connectDB from './db/index.js';

dotenv.config(); // No need for path if file is named `.env`

connectDB()
.then(() => {
  app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
  })
})
.catch((error) => {
  console.error('Failed to connect to MongoDB:', error);
  process.exit(1); // Exit the process with failure
});

















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
