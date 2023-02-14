import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import errorMiddleware from './middlewares/error-middleware.js';
import userRouter from "./router/user-router.js";
import recipeRouter from "./router/recipe-router.js";

config();
mongoose.set('strictQuery', true);

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    maxAge: 86400,
}));
app.use('/api', userRouter);
app.use('/api', recipeRouter);
app.use(errorMiddleware)

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch(error) {
        console.log(error);
    }
};
start();
