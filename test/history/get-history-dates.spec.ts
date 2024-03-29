import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { buildHistoryParams, historyFactory } from './history.factory';
import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { HISTORY_DATES } from '../endpoints/history.endpoints';
import { HistoryRepo } from './history.test-repo';
import { faker } from '@faker-js/faker';
describe('get history dates suite case', () => {
  it('should history dates and date should be equal to measured at if not null successfully', async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const history = await historyFactory({ client: client._id });
    delete history.client;
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: HISTORY_DATES,
      token: client.token,
    });
    expect(res.body[0].date).toBe(
      history.measuredAt.toISOString().substring(0, 10),
    );
  });

  it('should history dates in a range without duplication successfully', async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const measuredAt = faker.date.past();
    // making sure that the dates will be returned without duplication
    await historyFactory({ client: client._id, measuredAt });
    await historyFactory({ client: client._id, measuredAt });
    //a history outside the date range
    await historyFactory({
      client: client._id,
      measuredAt: faker.date.future(),
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${HISTORY_DATES}?date=${measuredAt}`,
      token: client.token,
    });
    expect(res.body[0].date).toBe(measuredAt.toISOString().substring(0, 10));
    expect(res.body.length).toBe(1);
  });

  it('should history dates and date should be equal to createdAt if measured at is null successfully', async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const history = await buildHistoryParams({ client: client._id });
    const seededHistory = await HistoryRepo().add({
      ...history,
      measuredAt: null,
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: HISTORY_DATES,
      token: client.token,
    });
    expect(res.body[0].date).toBe(
      seededHistory.createdAt.toISOString().substring(0, 10),
    );
  });
});
