import { clientFactory } from './../client/client.factory';
import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { clientProgramFactory } from './client-program.factory';
import { FILTER_CLIENT_PROGRAMS } from '../endpoints/client-program.endpoints';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { programFactory } from '../program/program.factory';
import { subscriptionFactory } from '../subscription/subscription.factory';
import { FilterClientProgramDto } from '../../src/client-program/inputs/filter-client-program.dto';

describe('get client program suite case', () => {
  it('should get client program successfully', async () => {
    const clientUser = await userFactory({ role: USER_ROLE.CLIENT });
    const client = await clientFactory({ _id: clientUser._id });
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const program = await programFactory({ trainer: trainer._id });
    await subscriptionFactory({ client: client._id, trainer: trainer._id });
    await clientProgramFactory({
      client: client._id,
      program: program._id,
    });
    const res = await testRequest<FilterClientProgramDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: FILTER_CLIENT_PROGRAMS,
      token: clientUser.token,
      params: { client: client._id },
    });
    expect(res.body.docs[0].client).toBe(client._id.toString());
  });
});
