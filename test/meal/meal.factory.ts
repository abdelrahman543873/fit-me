import { userFactory } from './../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { MealRepo } from './meal.test-repo';
import { Meal } from '../../src/meal/meal.schema';
import { faker } from '@faker-js/faker';
import { ITEM_UNITS_ENUM, MACRO_TYPES } from '../../src/meal/meal.constants';

export const buildMealParams = async (
  obj: Partial<Meal> = {},
): Promise<Meal> => {
  return {
    trainer:
      obj.trainer || (await userFactory({ role: USER_ROLE.TRAINER }))._id,
    title: obj.title || faker.company.name(),
    notes: obj.notes || faker.internet.displayName(),
    macros: obj.macros || [
      {
        type: faker.helpers.arrayElement<MACRO_TYPES>(
          Object.values(MACRO_TYPES),
        ),
        value: faker.number.int(),
      },
    ],
    items: obj.items || [
      {
        quantity: faker.number.int(),
        title: faker.commerce.product(),
        unit: faker.helpers.arrayElement<ITEM_UNITS_ENUM>(
          Object.values(ITEM_UNITS_ENUM),
        ),
        group: faker.word.noun(),
      },
    ],
  };
};

export const mealFactory = async (obj: Partial<Meal> = {}): Promise<Meal> => {
  const params: Partial<Meal> = await buildMealParams(obj);
  return await MealRepo().add(params);
};
