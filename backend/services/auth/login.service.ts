import {IAuthResponse} from '../../interfaces/auth/IAuthResponse';
import {UserRepository} from '../../repositories/user.repository';
import bcrypt from 'bcryptjs';
import {generateAccessToken} from "../../utils/jwt.utils";
import {LogindData} from '../../interfaces/auth/IAuthUser';

export class LoginService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async loginUser(data: LogindData): Promise<IAuthResponse> {
    const {email, password} = data;

    if(!email || !password) {
      throw new Error("Email and password are required");
    }

    const user = await this.userRepository.findEmail(email);
    if(!user) {
      throw new Error("User with this email does not exist");
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const payload = {userId: user._id.toString(), email: user.email};
    const accessToken = generateAccessToken(payload)

    return {
      user: {
        _id: user._id.toString(),
        email: user.email,
        username: user.username,
      },
      accessToken
    }
  }
 }