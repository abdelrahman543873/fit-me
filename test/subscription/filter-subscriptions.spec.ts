import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { subscriptionFactory } from './subscription.factory';
import { FILTER_SUBSCRIPTIONS } from '../endpoints/subscription.endpoint';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { FilterSubscriptionsDto } from '../../src/subscription/inputs/filter-subscriptions.dto';

describe('filter subscriptions suite case', () => {
  it('should filter subscriptions successfully', async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const subscription = await subscriptionFactory({
      client: client._id,
      trainer: trainer._id,
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: FILTER_SUBSCRIPTIONS,
      token: trainer.token,
    });
    expect(res.body.length).toBe(1);
    expect(res.body[0].client.firstName).toBe(client.firstName);
    expect(res.body[0].plan._id).toBe(subscription.plan.toString());
  });

  it('should filter subscriptions based on status successfully', async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const subscription = await subscriptionFactory({
      client: client._id,
      trainer: trainer._id,
    });
    const res = await testRequest<FilterSubscriptionsDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: FILTER_SUBSCRIPTIONS,
      token: trainer.token,
      params: { status: subscription.status },
    });
    expect(res.body.length).toBe(1);
    expect(res.body[0].client.firstName).toBe(client.firstName);
    expect(res.body[0].plan._id).toBe(subscription.plan.toString());
  });
});
