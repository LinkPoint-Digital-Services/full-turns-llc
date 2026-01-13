import {UserModel} from '../models/user.model';
import {BaseRepository} from './base.repository';
import {IUserDocument} from '../interfaces/user/IUser';

//Handles user-specific database queries and inherits the common logic from BaseRepository
export class UserRepository extends BaseRepository<IUserDocument> {
  constructor() {
    super(UserModel); //to access the UserModel methods
  }

  // Find user by email
  async findEmail(email: string): Promise<IUserDocument | null> {
    return this.model.findOne({email}).select('+password').exec();
  }

  // Create a new user method
  async createUser(data: Partial<IUserDocument>): Promise<IUserDocument> {
    const user = new this.model(data);
    return user.save();
  }

  // Reset password code methods
  async updateResetPasswordCode(email: string, code: string): Promise<IUserDocument | null> {
    return this.model.findOneAndUpdate({email}, {verificationCode: code}, {new: true}).exec();
  }

  // Get reset password code method
  async getResetPasswordCode(email: string): Promise<IUserDocument | null> {
    return this.model.findOne({email}).select('+reset_password_code').exec();
  }

  // Create new password method
  async createNewPasswrd(email: string, password: string) : Promise<IUserDocument | null> {
    return this.model.findOneAndUpdate({email}, {password: password}, {new: true}).exec();
  }
} 
