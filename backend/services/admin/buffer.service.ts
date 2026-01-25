import {UserRepository} from '../../repositories/user.repository';
import {ManagerModel, AdminModel} from '../../models/user.model';
import {Types} from 'mongoose';

export class BufferService {
  private adminRepo = new UserRepository('admin');

  async addBuffer(data: {
    manager_name: string;
    buffer_price: string;
    admin_id: string;
  }) {
    const {manager_name, buffer_price, admin_id} = data;

    if (!manager_name || !buffer_price || !admin_id) {
      throw new Error('manager_name, buffer_price, and admin_id are required');
    }

    const nameParts = manager_name.trim().split(' ');
    if (nameParts.length < 2)
      throw new Error('Please provide first and last name');

    const first_name = nameParts[0];
    const last_name = nameParts.slice(1).join(' ');

    const managerUser = await ManagerModel.findOne({
      first_name,
      last_name
    }).exec();
    if (!managerUser) throw new Error(`Manager ${manager_name} not found`);

    const bufferObject = {
      _id: new Types.ObjectId(),
      buffer_id: `BUF-${Date.now()}`,
      manager_name,
      buffer_price,
      created_at: new Date(),
      updated_at: new Date()
    };

    const updatedAdmin = await AdminModel.findByIdAndUpdate(
      admin_id,
      {$push: {buffers: bufferObject}},
      {new: true}
    );

    if (!updatedAdmin) throw new Error('Admin not found');

    return bufferObject;
  }

  async getBuffers(admin_id: string) {
    if (!admin_id) throw new Error('admin_id is required');

    const admin = await AdminModel.findById(admin_id).populate('buffers');

    if (!admin) throw new Error('Admin not found');

    return admin.buffers;
  }

  async deleteBuffer(data: {admin_id: string; buffer_id: string}) {
    const {admin_id, buffer_id} = data;

    if (!admin_id || !buffer_id) {
      throw new Error('user_id and buffer_id are required');
    }

    const updatedUser = await this.adminRepo.updateById(admin_id, {
      $pull: {buffers: {_id: buffer_id}}
    });

    if (!updatedUser) {
      throw new Error('User not found or buffer does not exist');
    }

    return {deletedBufferId: buffer_id};
  }
}
