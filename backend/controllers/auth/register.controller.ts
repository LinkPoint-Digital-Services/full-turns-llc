import {RegisterService} from '../../services/auth/register.service';
import {Response, Request} from 'express';
import asynchandler from 'express-async-handler';

const registerService = new RegisterService();

export const register = asynchandler(async (req: Request, res: Response) => {
  const user = await registerService.registerUser(req.body);
  res.status(201).json({
    success: true,
    message: 'User registered successfully', 
    data: user
  });
});