import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { buildHistoryParams } from './history.factory';
import { testRequest } from '../config/request';
import { AddHistoryDto } from '../../src/history/inputs/add-history.schema';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { HISTORY } from '../endpoints/history.endpoints';
describe('add history suite case', () => {
  it('should add history successfully', async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const history = await buildHistoryParams({ client: client._id });
    delete history.client;
    const res = await testRequest<AddHistoryDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: HISTORY,
      variables: history,
      token: client.token,
    });
    expect(res.body.type).toBe(history.type);
    expect(res.body.value).toBe(history.value);
    expect(res.body.reps).toBe(history.reps);
  });
});
