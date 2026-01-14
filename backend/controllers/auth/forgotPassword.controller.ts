import {Response, Request} from 'express';
import {ForgotPasswordService} from '../../services/auth/forgotPassword.service';
import {ResetPasswordService} from '../../services/auth/resetPassword.service';
import asyncHandler from 'express-async-handler';

// You can decide which role to inject here, or build a helper that auto-detects role by email
const forgotPasswordService = new ForgotPasswordService('manager');
const resetPasswordService = new ResetPasswordService('manager');

export const forgotPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const {type, email_address} = req.body;

    const result = await forgotPasswordService.findUserByEmail({type, email_address});

    res.status(200).json(result);
  }
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const {user, message} = await resetPasswordService.resetPassword(req.body);

    res.status(200).json({
      message,
      user
    });
  }
);
