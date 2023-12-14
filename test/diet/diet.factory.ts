import { faker } from '@faker-js/faker';
import { Diet } from '../../src/diet/diet.schema';
import { MACRO_TYPES } from '../../src/meal/meal.constants';
import { mealFactory } from '../meal/meal.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { DietRepo } from './diet.test-repo';
import { userFactory } from '../user/user.factory';

export const buildDietParams = async (
  obj: Partial<Diet> = {},
): Promise<Diet> => {
  return {
    trainer:
      obj.trainer || (await userFactory({ role: USER_ROLE.TRAINER }))._id,
    title: obj.title || faker.word.noun(),
    meals: obj.meals || [(await mealFactory())._id],
    notes: obj.notes || faker.commerce.productDescription(),
    macros: obj.macros || [
      {
        type: faker.helpers.arrayElement<MACRO_TYPES>(
          Object.values(MACRO_TYPES),
        ),
        value: faker.number.int(),
      },
    ],
  };
};

export const dietFactory = async (obj: Partial<Diet> = {}): Promise<Diet> => {
  const params: Partial<Diet> = await buildDietParams(obj);
  return await DietRepo().add({
    ...params,
  });
};
