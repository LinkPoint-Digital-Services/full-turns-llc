// import dotenv from 'dotenv';
// import cors from 'cors';
// import express, {Request, Response} from 'express';
// import ordersRouter from './routes/orders';

// const app = express();
// const port = 5000;

// dotenv.config();

// const corsOptions = {
//   origin: ['http://localhost:3000'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// };

// app.use(cors(corsOptions));
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));

// // Routes
// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello World!');
// });

// app.get('/users/data', (req: Request, res: Response) => {
//   const user = 'user';
//   return res.json({user});
// });

// // Orders route
// app.use('/api/orders', ordersRouter);

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import cookieParser from 'cookie-parser'; 
import connectToMongoDB from './config/db';
import router from './routes';
import { NextFunction } from 'express';
import helmet from "helmet";

import express, { Request, Response } from 'express'
const app = express()
const port = 5000

app.use(express.json());
app.use(helmet());

const corsOptions = {
    origin: [
      'http://localhost:3000',
      'https://frontend-drab.vercel.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true 
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(cookieParser())
connectToMongoDB();

app.use('/api', router); // Centralized route handling

//Centralized error handling middleware (for unexpected errors in routes)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {

  const statusCode = err.statusCode || 500;
  const message = err.message || "Something broke!";

  res.status(statusCode).json({ message });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
