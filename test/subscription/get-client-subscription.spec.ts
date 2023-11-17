import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { UserLoginDto } from '../../src/user/inputs/user-login.dto';
import { subscriptionFactory } from './subscription.factory';
import { SUBSCRIPTION } from '../endpoints/subscription.endpoint';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { planFactory } from '../plan/plan.factory';

describe('get client subscription suite case', () => {
  it('should get client subscription successfully', async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const plan = await planFactory({ trainer: trainer._id });
    const subscription = await subscriptionFactory({
      client: client._id,
      trainer: trainer._id,
      plan: plan._id,
    });
    const res = await testRequest<UserLoginDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: SUBSCRIPTION,
      token: client.token,
    });
    const endDate = new Date(res.body.endDate).getTime();
    const approvedDate = new Date(res.body.approvedAt).getTime();
    expect(res.body.plan._id).toBe(subscription.plan.toString());
    expect(+((endDate - approvedDate) / 2592000000).toFixed(0)).toBe(
      plan.monthsDuration,
    );
  });
});
