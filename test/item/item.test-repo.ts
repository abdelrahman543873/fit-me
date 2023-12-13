import { ItemRepository } from '../../src/item/item.repository';

export const ItemRepo = (): ItemRepository => global.itemRepository;
