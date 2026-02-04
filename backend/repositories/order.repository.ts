import { OrderModel } from '../models/manager/order.model';
import { IOrder } from '../interfaces/manager/IOrder';
import { BaseRepository } from './base.repository';
import { Document } from 'mongoose';

export class OrderRepository extends BaseRepository<any> {
  constructor() {
    super(OrderModel);
  }

  async findWithManager(filter: any) {
    return OrderModel.find(filter).populate('managerId', 'first_name last_name email_address').exec();
  }
}
