import { Model, Document, UpdateQuery, QueryOptions } from 'mongoose';

export abstract class BaseRepository<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  async create(data: Partial<T>): Promise<T> {
    const document = new this.model(data);
    return document.save();
  }

  async findById(id: string, projection?: any): Promise<T | null> {
    return this.model.findById(id, projection).exec();
  }

  async findOne(filter?: any): Promise<T | null> {
    return this.model.findOne(filter).exec();
  }

  async find(
    filter?: any,
    projection?: any,
    options?: QueryOptions
  ): Promise<T[]> {
    return this.model.find(filter, projection, options).exec();
  }

  async updateById(id: string, update: UpdateQuery<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(
      id,
      update,
      { new: true, runValidators: true }
    ).exec();
  }

  async deleteById(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }

  async count(filter?: any): Promise<number> {
    return this.model.countDocuments(filter).exec();
  }
}
