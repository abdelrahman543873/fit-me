import { faker } from '@faker-js/faker/locale/af_ZA';
import { ItemRepo } from './item.test-repo';
import { Item } from '../../src/item/item.schema';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { ITEM_UNITS_ENUM } from '../../src/item/item.constants';

export const buildItemParams = async (
  obj: Partial<Item> = {},
): Promise<Item> => {
  return {
    trainer:
      obj.trainer || (await userFactory({ role: USER_ROLE.TRAINER }))._id,
    title: obj.title || faker.commerce.product(),
    quantity: obj.quantity || faker.number.int({ max: 100 }),
    unit:
      obj.unit ||
      faker.helpers.arrayElement<ITEM_UNITS_ENUM>(
        Object.values(ITEM_UNITS_ENUM),
      ),
  };
};

export const itemFactory = async (obj: Partial<Item> = {}): Promise<Item> => {
  const params: Partial<Item> = await buildItemParams(obj);
  return await ItemRepo().add(params);
};
