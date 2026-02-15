import {Request, Response} from 'express';
import {LoginService} from '../../services/auth/login.service';
import asynchandler from 'express-async-handler';
import {IAuthUser} from '../../interfaces/auth/IAuthUser';

const loginService = new LoginService();

export const login = asynchandler(async (req: Request, res: Response) => {
  const {accessToken, user} = await loginService.loginUser(req.body);

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none', //set sameSite none if ready for production
    maxAge: 60 * 24 * 60 * 60 * 1000 // 60 days
  });

  const responseUser: IAuthUser = user;

  res.status(200).json({
    message: 'Login successful',
    user: responseUser
  });
});
