import { userFactory } from '../user/user.factory';
import { faker } from '@faker-js/faker';
import { USER_ROLE } from '../../src/user/user.constants';
import { HISTORY_TYPE } from '../../src/history/history.constants';
import { History } from '../../src/history/history.schema';
import { exerciseFactory } from '../exercise/exercise.factory';
import { HistoryRepo } from './history.test-repo';

export const buildHistoryParams = async (
  obj: Partial<History> = {},
): Promise<Partial<History>> => {
  return {
    type:
      obj.type ||
      faker.helpers.arrayElement<HISTORY_TYPE>(Object.values(HISTORY_TYPE)),
    client: obj.client || (await userFactory({ role: USER_ROLE.CLIENT }))._id,
    exercise: obj.exercise || (await exerciseFactory())._id,
    comment: obj.comment || faker.commerce.productDescription(),
    reps: obj.reps || faker.number.int({ max: 100 }),
    value: obj.value || faker.number.int({ max: 100 }),
    measuredAt: obj.measuredAt || faker.date.past(),
    media: obj.media || faker.internet.url(),
  };
};

export const historyFactory = async (
  obj: Partial<History> = {},
): Promise<History> => {
  const params: Partial<History> = await buildHistoryParams(obj);
  return await HistoryRepo().add(params);
};
