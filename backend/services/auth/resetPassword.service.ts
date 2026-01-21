import {UserRepository} from '../../repositories/user.repository';
import {IForgotResponse} from '../../interfaces/auth/IForgotPasswordResponse';
import {resetPasswordTemplate} from '../../utils/emailTemplates';
import {successResetPasswordEmail} from '../../utils/mailer';
import bcrypt from 'bcryptjs';

export class ResetPasswordService {
  private userRepository: UserRepository;

  constructor(role: 'manager') {
    this.userRepository = new UserRepository(role);
  }

  async resetPassword(data: any): Promise<IForgotResponse> {
    const {email_address, type, code, newPassword} = data;
    const user = await this.userRepository.findEmail(email_address);

    if (!user) {
      throw new Error('Email does not exist');
    }

    if (type === 'verify_code') {
      const dbCode = await this.userRepository.getResetPasswordCode(
        email_address
      );

      console.log('DB Code:', dbCode?.verificationCode);
      console.log('Provided Code:', code);

      if (dbCode?.verificationCode !== code) {
        throw new Error('Code is incorrect');
      }

      await this.userRepository.updateResetPasswordCode(email_address, '');
    }

    if (type === 'newPassword') {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.userRepository.createNewPassword(
        email_address,
        hashedPassword
      );

      successResetPasswordEmail(
        email_address,
        'Password reset successful',
        resetPasswordTemplate(),
        resetPasswordTemplate()
      );
    }

    const userResponse: any = {
      _id: user._id,
      email_address: user.email_address,
    };

    return {
      message:
        type === 'verify_code'
          ? 'Code verified successfully'
          : 'Password reset successfully',
      user: userResponse
    };
  }
}
