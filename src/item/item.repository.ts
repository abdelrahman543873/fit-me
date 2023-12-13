import { InjectModel } from '@nestjs/mongoose';
import { Item, ItemDocument } from './item.schema';
import { Model, ObjectId } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { AddItemsDto } from './inputs/add-items.dto';

export class ItemRepository extends BaseRepository<Item> {
  constructor(
    @InjectModel(Item.name)
    private itemSchema: Model<ItemDocument>,
  ) {
    super(itemSchema);
  }

  addItems(trainer: ObjectId, addItemsDto: AddItemsDto) {
    return this.itemSchema.insertMany(
      addItemsDto.items.map((item) => {
        return { ...item, trainer: trainer };
      }),
    );
  }
}
