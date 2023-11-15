import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { subscriptionFactory } from './subscription.factory';
import { APPROVE_SUBSCRIPTION } from '../endpoints/subscription.endpoint';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { SUBSCRIPTION_STATUS } from '../../src/subscription/subscription.constants';
import { testRequest } from '../config/request';

describe('approve subscription suite case', () => {
  it('should approve subscription successfully', async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const subscription = await subscriptionFactory({
      client: client._id,
      trainer: trainer._id,
      status: SUBSCRIPTION_STATUS.INITIAL,
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: `${APPROVE_SUBSCRIPTION}/${subscription._id.toString()}`,
      token: client.token,
    });
    expect(res.body.status).toBe(SUBSCRIPTION_STATUS.APPROVED);
  });
});
