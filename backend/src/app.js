import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN, // Adjust this to your frontend URL
  credentials: true, // Allow cookies to be sent with requests
}));

app.use(express.json({limit: '50mb'})); // Increase the limit to 50mb
app.use(express.urlencoded({extended: true, limit: '50mb'})); // Increase the limit to 50mb
app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(cookieParser()); // Parse cookies from incoming requests

// Import routes
import userRouter from './routes/user.router.js';
import issueRouter from './routes/issue.router.js';
import adminRouter from './routes/admin.routes.js';

// Use routes 
app.use('/api/users', userRouter);
app.use('/api/admins', adminRouter);
app.use('/api/issues', issueRouter);

export {app};// Note: Make sure to set the CORS_ORIGIN environment variable in your .env file