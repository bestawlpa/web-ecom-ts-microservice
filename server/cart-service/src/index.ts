import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import cors from 'cors';
import cart from './route/cartRoutes';


const app = express();

dotenv.config();
connectDB();

app.use(express.json());


app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true,
}));

app.use('/api', cart)

app.get('/', (req: Request, res: Response) => {
    res.status(200).send("My first server!");
});

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server running on  http://localhost:${PORT}/api/carts`)
})