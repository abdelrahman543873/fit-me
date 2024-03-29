import { Repository } from '../interfaces/repository.interface';
import {
  Model,
  FilterQuery,
  UpdateQuery,
  SaveOptions,
  QueryWithHelpers,
  AnyKeys,
  HydratedDocument,
} from 'mongoose';

export abstract class BaseRepository<T> implements Repository<T> {
  // creating a property to use your code in all instances
  // that extends your base repository and reuse on methods of class
  private _model: Model<HydratedDocument<T>>;

  // we created constructor with arguments to manipulate mongodb operations
  constructor(schemaModel: Model<HydratedDocument<T>>) {
    this._model = schemaModel;
  }

  async add(item: AnyKeys<T>): Promise<HydratedDocument<T>> {
    return await this._model.create(item);
  }

  async addMany(
    item: T[],
    options?: { ordered?: boolean; rawResult?: boolean },
  ) {
    return await this._model.insertMany(item, options);
  }

  async rawDelete(): Promise<{ deletedCount?: number }> {
    return await this._model.deleteMany({});
  }

  deleteOne(filter: FilterQuery<T>): QueryWithHelpers<any, any> {
    return this._model.deleteOne(filter);
  }

  findOne(filter: FilterQuery<T>, projection?: any): QueryWithHelpers<T, T> {
    return this._model.findOne(filter, projection);
  }

  find(
    filter: FilterQuery<HydratedDocument<T>>,
    projection?: any,
  ): Promise<HydratedDocument<T>[]> {
    return this._model.find(filter, projection);
  }

  count(filter?: FilterQuery<T>) {
    return this._model.count(filter);
  }

  updateOne(
    filter: FilterQuery<T>,
    update: UpdateQuery<HydratedDocument<T>>,
  ): QueryWithHelpers<any, T> {
    return this._model.findOneAndUpdate(filter, update, { new: true });
  }

  create(doc: AnyKeys<T>, options?: SaveOptions) {
    return this._model.create(doc, options);
  }
}
