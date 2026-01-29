import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectToMongoDB from './config/db';
import router from './routes';
import {NextFunction} from 'express';

import express, {Request, Response} from 'express';
const app = express();
const port = 5000;

app.use(express.json());

const corsOptions = {
  origin: ['http://localhost:3000', 'https://full-turns-llc.vercel.app/'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.get('/', (req: Request, res: Response) => res.send('Express on Vercelss'));

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(cookieParser());
connectToMongoDB();

app.use('/api', router); // Centralized route handling

//Centralized error handling middleware (for unexpected errors in routes)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something broke!';

  res.status(statusCode).json({message});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
