import {UserRepository} from '../../repositories/user.repository';
import {IForgotResponse} from '../../interfaces/auth/IForgotPasswordResponse';
import {IUserEmailParams} from '../../interfaces/auth/IAuthResponse';
import {
  verifyEmailTemplate,
} from '../../utils/emailTemplates';
import {verifyEmail} from '../../utils/mailer';

export class ForgotPasswordService {
  private userRepository: UserRepository;

  constructor(role: 'manager' | 'admin' | 'superadmin') {
    // repository tied to role
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

    const userResponse: any = {
      _id: user._id,
      email_address: user.email_address,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role
    };

    if (user.role === 'manager') {
      userResponse.account_type = user.account_type;
      userResponse.company_name = user.company_name;
    }

    return {
      message: 'Check your email for verification code',
      user: userResponse
    };
  }
}
