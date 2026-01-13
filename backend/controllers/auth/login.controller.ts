import {Request, Response} from 'express';
import {LoginService} from '../../services/auth/login.service';
import asynchandler from 'express-async-handler';

const loginService = new LoginService()

export const login = asynchandler(async (req: Request, res: Response) => {
  const {accessToken, user} = await loginService.loginUser(req.body);

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Set to true in production
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  res.status(200).json({
    message: "Login successful", 
    user: {id: user._id, email: user.email, username: user.username}
  });
})
