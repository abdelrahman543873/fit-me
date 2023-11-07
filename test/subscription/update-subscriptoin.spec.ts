import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { subscriptionFactory } from './subscription.factory';
import { SUBSCRIPTION } from '../endpoints/subscription.endpoint';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { UpdateSubscriptionDto } from '../../src/subscription/inputs/update-subscription.dto';

describe('update subscriptions suite case', () => {
  it('should update subscriptions successfully', async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const subscription = await subscriptionFactory({
      client: client._id,
      trainer: trainer._id,
    });
    const res = await testRequest<UpdateSubscriptionDto>({
      method: HTTP_METHODS_ENUM.PUT,
      url: `${SUBSCRIPTION}/${subscription._id.toString()}`,
      token: trainer.token,
      variables: { accepted: !subscription.accepted },
    });
    expect(res.body.accepted).toBe(!subscription.accepted);
  });
});
