import { Injectable } from '@nestjs/common';
import { ItemRepository } from './item.repository';
import { AddItemsDto } from './inputs/add-items.dto';
import { ObjectId } from 'mongoose';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) {}

  addItems(trainer: ObjectId, addItemsDto: AddItemsDto) {
    return this.itemRepository.addItems(trainer, addItemsDto);
  }
}
