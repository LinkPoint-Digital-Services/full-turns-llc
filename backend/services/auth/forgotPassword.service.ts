import {UserRepository} from '../../repositories/user.repository';
import {IForgotResponse} from '../../interfaces/auth/IForgotPasswordResponse';
import {IUserEmailParams} from '../../interfaces/auth/IAuthResponse';
import {verifyEmailTemplate} from '../../utils/emailTemplates';
import {verifyEmail} from '../../utils/mailer';

export class ForgotPasswordService {
  private userRepository: UserRepository;

  constructor(role: 'manager') {
    this.userRepository = new UserRepository(role);
  }

  async findUserByEmail(data: IUserEmailParams): Promise<IForgotResponse> {
    const user = await this.userRepository.findEmail(data.email_address);
    if (!user) {
      throw new Error('Email does not exist');
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await verifyEmail(
      data.email_address,
      'Verify Email',
      verifyEmailTemplate(code),
      verifyEmailTemplate(code)
    );

    await this.userRepository.updateResetPasswordCode(data.email_address, code);
    return {
      message: 'Check your email for verification code'
    };
  }
}
