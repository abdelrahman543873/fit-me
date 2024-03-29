import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { buildHistoryParams } from './history.factory';
import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { FILTER_HISTORY } from '../endpoints/history.endpoints';
import { FilterHistoryDto } from '../../src/history/inputs/filter-history.dto';
import { HistoryRepo } from './history.test-repo';
import { clientFactory } from '../client/client.factory';
describe('filter history suite case', () => {
  it('should filter history successfully', async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const params = await buildHistoryParams({ client: client._id });
    const history = await HistoryRepo().add({ ...params, measuredAt: null });
    delete history.client;
    const res = await testRequest<FilterHistoryDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: FILTER_HISTORY,
      params: {
        type: history.type,
        value: history.value,
        createdAt: history.createdAt.toISOString() as any,
      },
      token: client.token,
    });
    expect(res.body[0].exercise._id).toBe(history.exercise.toString());
    expect(res.body[0].type).toBe(history.type);
    expect(res.body[0].value).toBe(history.value);
    expect(res.body[0].reps).toBe(history.reps);
  });

  it('should filter history as a trainer successfully', async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    await clientFactory({ _id: client._id });
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const params = await buildHistoryParams({ client: client._id });
    const history = await HistoryRepo().add({ ...params, measuredAt: null });
    delete history.client;
    const res = await testRequest<FilterHistoryDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: FILTER_HISTORY,
      params: {
        type: history.type,
        value: history.value,
        createdAt: history.createdAt.toISOString() as any,
        client: client._id.toString() as any,
      },
      token: trainer.token,
    });
    expect(res.body.message).toContain('unauthorized client');
  });
});
