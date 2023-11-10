import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { subscriptionFactory } from './subscription.factory';
import { SKIP_FORM } from '../endpoints/subscription.endpoint';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { SUBSCRIPTION_STATUS } from '../../src/subscription/subscription.constants';

describe('skip form suite case', () => {
  it('should skip form successfully', async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    await subscriptionFactory({
      client: client._id,
      trainer: trainer._id,
      status: SUBSCRIPTION_STATUS.INITIAL,
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: SKIP_FORM,
      token: client.token,
    });
    expect(res.body.status).toBe(SUBSCRIPTION_STATUS.PENDING);
  });
});
