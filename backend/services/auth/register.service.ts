import bcrypt from 'bcryptjs';
import {UserRepository} from '../../repositories/user.repository';
import {IUserDocument} from '../../interfaces/user/IUser';

export class RegisterService {
  async registerUser(data: IUserDocument): Promise<IUserDocument> {
    const {
      first_name,
      last_name,
      email_address,
      account_type,
      company_name,
      contact_no,
      password,
      role
    } = data;

    if (!first_name || !last_name || !email_address || !password || !role) {
      throw new Error('All required fields must be provided');
    }

    // repository tied to the role
    const userRepository = new UserRepository(role);

    const existingUser = await userRepository.findEmail(email_address);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return userRepository.createUser({
      first_name,
      last_name,
      email_address,
      account_type,
      company_name,
      contact_no,
      password: hashedPassword,
      role
    });
  }
}
