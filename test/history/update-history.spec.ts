import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { buildHistoryParams, historyFactory } from './history.factory';
import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { HISTORY } from '../endpoints/history.endpoints';
describe('update history suite case', () => {
  it('should update history successfully', async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const history = await historyFactory({ client: client._id });
    const params = await buildHistoryParams({ client: client._id });
    delete params.client;
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: `${HISTORY}/${history._id.toString()}`,
      variables: { ...params, exercise: params.exercise.toString() },
      token: client.token,
      fileParam: 'media',
    });
    expect(res.body.type).toBe(params.type);
    expect(res.body.value).toBe(params.value);
    expect(res.body.reps).toBe(params.reps);
  });
});
