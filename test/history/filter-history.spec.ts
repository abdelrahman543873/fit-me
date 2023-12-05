import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { historyFactory } from './history.factory';
import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { FILTER_HISTORY } from '../endpoints/history.endpoints';
import { FilterHistoryDto } from '../../src/history/inputs/filter-history.schema';
describe('filter history suite case', () => {
  it('should filter history successfully', async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const history = await historyFactory({ client: client._id });
    delete history.client;
    const res = await testRequest<FilterHistoryDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: FILTER_HISTORY,
      params: {
        type: history.type,
        value: history.value,
        createdAt: history.createdAt,
      },
      token: client.token,
    });
    expect(res.body[0].type).toBe(history.type);
    expect(res.body[0].value).toBe(history.value);
    expect(res.body[0].reps).toBe(history.reps);
  });
});
