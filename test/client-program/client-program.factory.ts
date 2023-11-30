import { ClientProgram } from '../../src/client-program/client-program.schema';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { programFactory } from '../program/program.factory';
import { faker } from '@faker-js/faker';
import { ClientProgramRepo } from './client-program.test-repo';

export const buildClientProgramParams = async (
  obj: Partial<ClientProgram> = {},
): Promise<Partial<ClientProgram>> => {
  return {
    client: obj.client || (await userFactory({ role: USER_ROLE.CLIENT }))._id,
    program: obj.program || (await programFactory())._id,
    endDate: obj.endDate || faker.date.future(),
    followUpDates: obj.followUpDates || [faker.date.future()],
    startDate: obj.startDate || faker.date.past(),
    lastFollowUpDate: obj.lastFollowUpDate ?? faker.date.past(),
  };
};

export const clientProgramFactory = async (
  obj: Partial<ClientProgram> = {},
): Promise<ClientProgram> => {
  const params: Partial<ClientProgram> = await buildClientProgramParams(obj);
  return await ClientProgramRepo().add(params);
};
