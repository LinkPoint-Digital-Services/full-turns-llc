import {Response, Request} from "express";
import {ForgotPasswordService, ResetPasswordService} from "../../services/auth/forgotPassword.service";
import asyncHandler from 'express-async-handler';


const forgotPasswordService = new ForgotPasswordService();
const resetPasswordService = new ResetPasswordService();

export const forgotPassword = asyncHandler( async(req: Request, res: Response) => {
  const {type, email} = req.body;
  const result = await forgotPasswordService.findUserByEmail({type, email});
  res.status(200).json(result);
})

export const resetPassword = asyncHandler( async(req: Request, res: Response) => {
  const {user, message} = await resetPasswordService.resetPassword(req.body)
  res.status(200).json({
    message, 
    user
  });
})