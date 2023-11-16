import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { clientProgramFactory } from './client-program.factory';
import { FILTER_CLIENT_PROGRAMS } from '../endpoints/client-program.endpoints';
import { AddClientProgramDto } from '../../src/client-program/inputs/add-client-program.dto';
import { userFactory } from '../user/user.factory';

describe('get client program suite case', () => {
  it('should get client program successfully', async () => {
    const client = await userFactory();
    await clientProgramFactory({
      client: client._id,
    });
    const res = await testRequest<AddClientProgramDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: FILTER_CLIENT_PROGRAMS,
      token: client.token,
    });
    expect(res.body[0].client).toBe(client._id.toString());
  });
});
