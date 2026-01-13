import {UserRepository} from '../../repositories/user.repository';
import {IForgotResponse} from '../../interfaces/auth/IForgotPasswordResponse';
import {IUserEmailParams} from '../../interfaces/auth/IAuthResponse';
import {
  verifyEmailTemplate,
  resetPasswordTemplate
} from '../../utils/emailTemplates';
import {verifyEmail, successResetPasswordEmail} from '../../utils/mailer';
import bcrypt from 'bcryptjs';

export class ForgotPasswordService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async findUserByEmail(data: IUserEmailParams): Promise<IForgotResponse> {
    const user = await this.userRepository.findEmail(data.email);
    if (!user) {
      throw new Error('Email is not exists');
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await verifyEmail(
      data.email,
      'Verify Email',
      verifyEmailTemplate(code),
      verifyEmailTemplate(code)
    );
    await this.userRepository.updateResetPasswordCode(data.email, code);

    return {
      message: 'Check your email for verification code',
      user: {
        _id: user._id,
        email: user.email,
        username: user.username
      }
    };
  }
}

// Service for resetting password
export class ResetPasswordService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async resetPassword(data: any): Promise<IForgotResponse> {
    const {email, type, code, newPassword} = data;
    const user = await this.userRepository.findEmail(email);

    if (!user) {
      throw new Error('Email is not existing');
    }

    if (type === 'verify_code') {
      const dbCode = await this.userRepository.getResetPasswordCode(email);

      if (dbCode?.verificationCode !== code) {
        throw new Error('Code is incorrect');
      }

      await this.userRepository.updateResetPasswordCode(email, '');
    }

    if (type === 'newPassword') {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.userRepository.createNewPasswrd(email, hashedPassword);
      successResetPasswordEmail(
        email,
        'Password reset successful',
        resetPasswordTemplate(),
        resetPasswordTemplate()
      );
    }

    return {
      message: type === 'verify_code' ? 'Code verified successfully' : 'Password reset successfully',
      user: {
        _id: user._id,
        email: user.email,
        username: user.username
      }
    };
  }
}
