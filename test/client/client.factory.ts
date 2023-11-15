import { userFactory } from './../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { ClientRepo } from './client.test-repo';
import { Client } from '../../src/client/client.schema';

export const buildClientParams = async (
  obj: Partial<Client> = {},
): Promise<Partial<Client>> => {
  return {
    _id: obj._id || (await userFactory({ role: USER_ROLE.CLIENT }))._id,
  };
};

export const clientFactory = async (
  obj: Partial<Client> = {},
): Promise<Client> => {
  const params: Partial<Client> = await buildClientParams(obj);
  return await ClientRepo().add(params);
};
