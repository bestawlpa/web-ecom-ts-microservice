import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import cors from 'cors'
import user from './route/userRoutes'
import cookieParser from 'cookie-parser';

const app = express();

dotenv.config();
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true,
}));

app.use('/api', user)

app.get('/', (req: Request, res: Response) => {
    res.status(200).send("My first server!");
});


const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server running on  http://localhost:${PORT}/api/users`)
})