import { ServiceModel } from '../../models/admin/service.model';
import { ItemModel } from '../../models/admin/item.model';
import { IService } from '../../interfaces/admin/IService';

export class ServiceService {
  static async addService(admin_id: string, service: IService) {
    return await ServiceModel.create({
      ...service,
      admin_id
    });
  }

  static async updateService(
    admin_id: string,
    serviceId: string,
    updateData: Partial<IService>
  ) {
    return await ServiceModel.findOneAndUpdate(
      { _id: serviceId, admin_id },
      { $set: updateData },
      { new: true }
    );
  }

  static async deleteService(admin_id: string, serviceId: string) {
    // Delete associated items first
    await ItemModel.deleteMany({ serviceId });
    
    return await ServiceModel.findOneAndDelete({
      _id: serviceId,
      admin_id
    });
  }

  static async getServices(admin_id: string) {
    return await ServiceModel.find({ admin_id });
  }
}
