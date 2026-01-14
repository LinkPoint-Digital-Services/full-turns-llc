import {ManagerModel, AdminModel, SuperAdminModel} from '../models/user.model';
import {BaseRepository} from './base.repository';
import {IUserDocument} from '../interfaces/user/IUser';

export class UserRepository extends BaseRepository<IUserDocument> {
  constructor(role: 'manager' | 'admin' | 'superadmin') {
    let model;
    switch (role) {
      case 'manager':
        model = ManagerModel;
        break;
      case 'admin':
        model = AdminModel;
        break;
      case 'superadmin':
        model = SuperAdminModel;
        break;
      default:
        throw new Error(`Unsupported role: ${role}`);
    }
    super(model);
  }

  async findEmail(email: string): Promise<IUserDocument | null> {
    return this.model
      .findOne({email_address: email})
      .select('+password')
      .exec();
  }

  async createUser(data: Partial<IUserDocument>): Promise<IUserDocument> {
    const user = new this.model(data);
    return user.save();
  }

  async updateResetPasswordCode(
    email: string,
    code: string
  ): Promise<IUserDocument | null> {
    return this.model
      .findOneAndUpdate(
        {email_address: email},
        {verificationCode: code},
        {new: true}
      )
      .exec();
  }

  async getResetPasswordCode(email: string): Promise<IUserDocument | null> {
    return this.model
      .findOne({email_address: email})
      .select('+verificationCode')
      .exec();
  }

  async createNewPassword(
    email: string,
    password: string
  ): Promise<IUserDocument | null> {
    return this.model
      .findOneAndUpdate({email_address: email}, {password}, {new: true})
      .exec();
  }
}
