import {ItemModel} from '../../models/admin/item.model';
import {IItem} from '../../interfaces/admin/IItem';

export class ItemService {
  static async addItem(admin_id: string, item: IItem) {
    return await ItemModel.create({
      ...item,
      admin_id
    });
  }

  static async updateItem(
    admin_id: string,
    itemId: string,
    updateData: Partial<IItem>
  ) {
    return await ItemModel.findOneAndUpdate(
      {_id: itemId, admin_id},
      {$set: updateData},
      {new: true}
    );
  }

  static async deleteItem(admin_id: string, itemId: string) {
    return await ItemModel.findOneAndDelete({
      _id: itemId,
      admin_id
    });
  }

  static async getItems(admin_id?: string) {
    const filter = admin_id ? {admin_id} : {};
    return await ItemModel.find(filter).lean().exec();
  }
}
