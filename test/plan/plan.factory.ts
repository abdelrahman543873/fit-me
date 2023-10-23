import { userFactory } from './../user/user.factory';
import { Plan } from '../../src/plan/plan.schema';
import { PlanRepo } from './plan.test-repo';
import { faker } from '@faker-js/faker';
import { FOLLOW_UP_FREQUENCY, PLAN_TYPE } from '../../src/plan/plan.constants';
import { USER_ROLE } from '../../src/user/user.constants';

export const buildPlanParams = async (obj: Partial<Plan> = {}) => {
  return {
    trainerId:
      obj.trainerId || (await userFactory({ role: USER_ROLE.TRAINER }))._id,
    title: obj.title || faker.word.noun(),
    type:
      obj.type ||
      faker.helpers.arrayElement<PLAN_TYPE>(Object.values(PLAN_TYPE)),
    monthsDuration: obj.monthsDuration || faker.number.int({ max: 30 }),
    followUpFrequency:
      obj.followUpFrequency ||
      faker.helpers.arrayElement<FOLLOW_UP_FREQUENCY>(
        Object.values(FOLLOW_UP_FREQUENCY),
      ),
    description: obj.description || faker.commerce.productDescription(),
    price: obj.price || faker.number.float({ max: 1000 }),
    currency: obj.currency || faker.finance.currencyCode(),
  };
};

export const planFactory = async (obj: Partial<Plan> = {}): Promise<Plan> => {
  const params: Partial<Plan> = await buildPlanParams(obj);
  return await PlanRepo().add({
    ...params,
  });
};
