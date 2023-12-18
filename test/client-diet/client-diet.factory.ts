import { dietFactory } from './../diet/diet.factory';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { faker } from '@faker-js/faker';
import { ClientDietRepo } from './client-diet.test-repo';
import { ClientDiet } from '../../src/client-diet/client-diet.schema';

export const buildClientDietParams = async (
  obj: Partial<ClientDiet> = {},
): Promise<Partial<ClientDiet>> => {
  return {
    client: obj.client || (await userFactory({ role: USER_ROLE.CLIENT }))._id,
    diet: obj.diet || (await dietFactory())._id,
    endDate: obj.endDate || faker.date.future(),
    followUpDates: obj.followUpDates || [faker.date.future()],
    startDate: obj.startDate || faker.date.past(),
    lastFollowUpDate: obj.lastFollowUpDate ?? faker.date.past(),
  };
};

export const clientDietFactory = async (
  obj: Partial<ClientDiet> = {},
): Promise<ClientDiet> => {
  const params: Partial<ClientDiet> = await buildClientDietParams(obj);
  return await ClientDietRepo().add(params);
};
