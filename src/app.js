import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({extended: true, limit: '16kb'}));
app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(cookieParser());
app.use(express.json()); // <--- Add this line


//routes import

import userRouter from './routes/user.routes.js';

//routes declaration
app.use("/api/v1/users", userRouter); //standard practice



export default app;