import {ManagerModel} from '../../models/user.model';
import {IUser} from '../../interfaces/user/IUser';

// Fields that can be updated by the manager
type UpdatableProfileFields = Pick<
  IUser,
  'first_name' | 'last_name' | 'company_name' | 'email_address' | 'contact_no'
>;

export class ProfileService {
  static async updateProfile(
    manager_id: string,
    updateData: Partial<UpdatableProfileFields>
  ) {
    const setFields: Record<string, unknown> = {};

    if (updateData.first_name !== undefined) {
      setFields.first_name = updateData.first_name;
    }
    if (updateData.last_name !== undefined) {
      setFields.last_name = updateData.last_name;
    }
    if (updateData.company_name !== undefined) {
      setFields.company_name = updateData.company_name;
    }
    if (updateData.email_address !== undefined) {
      setFields.email_address = updateData.email_address;
    }
    if (updateData.contact_no !== undefined) {
      setFields.contact_no = updateData.contact_no;
    }

    // Add updated_at timestamp
    setFields.updated_at = new Date();

    if (Object.keys(setFields).length === 1) {
      return ManagerModel.findById(manager_id).select(
        '-password -verificationCode'
      );
    }

    return ManagerModel.findOneAndUpdate(
      {_id: manager_id},
      {$set: setFields},
      {new: true}
    ).select('-password -verificationCode');
  }
}
