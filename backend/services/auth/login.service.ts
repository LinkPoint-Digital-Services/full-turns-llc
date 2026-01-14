import {IAuthResponse} from '../../interfaces/auth/IAuthResponse';
import {UserRepository} from '../../repositories/user.repository';
import bcrypt from 'bcryptjs';
import {generateAccessToken} from '../../utils/jwt.utils';
import {LogindData} from '../../interfaces/auth/IAuthUser';
import {IAuthUser} from '../../interfaces/auth/IAuthUser';

export class LoginService {
  async loginUser(data: LogindData): Promise<IAuthResponse> {
    const {email_address, password} = data;

    if (!email_address || !password) {
      throw new Error('Email and password are required');
    }

    // Since role is determined from DB, we can query all collections
    // For simplicity, try managers, admins, superadmins in sequence
    let userRepository = new UserRepository('manager');
    let user = await userRepository.findEmail(email_address);

    if (!user) {
      userRepository = new UserRepository('admin');
      user = await userRepository.findEmail(email_address);
    }

    if (!user) {
      userRepository = new UserRepository('superadmin');
      user = await userRepository.findEmail(email_address);
    }

    if (!user) {
      throw new Error('User with this email does not exist');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const payload = {
      userId: user._id.toString(),
      email: user.email_address,
      role: user.role
    };
    const accessToken = generateAccessToken(payload);

    // Base user response
    const userResponse: IAuthUser = {
      _id: user._id.toString(),
      email_address: user.email_address,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role
    };

    // Add manager-specific fields
    if (user.role === 'manager') {
      userResponse.account_type = user.account_type;
      userResponse.company_name = user.company_name;
    }

    return {
      user: userResponse,
      accessToken
    };
  }
}
