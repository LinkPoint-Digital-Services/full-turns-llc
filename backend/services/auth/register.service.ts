import bcrypt from "bcryptjs";
import {UserRepository} from "../../repositories/user.repository";
import {IUserDocument} from "../../interfaces/user/IUser";


export class RegisterService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async registerUser(data: IUserDocument): Promise<IUserDocument> {
    const {username, birthdate, email, password} = data;

    if(!username || !birthdate || !email || !password) {
      throw new Error("All fields are required");
    }

    const existingUser = await this.userRepository.findEmail(email);
    if(existingUser) {
      throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    return this.userRepository.createUser({
      username,
      birthdate,
      email,
      password: hashedPassword
    })
  }
}