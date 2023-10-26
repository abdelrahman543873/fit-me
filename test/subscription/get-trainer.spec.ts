import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { UserLoginDto } from '../../src/user/inputs/user-login.dto';
import { subscriptionFactory } from './subscription.factory';
import { SUBSCRIPTION_TRAINER } from '../endpoints/subscription.endpoint';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';

describe('get trainer suite case', () => {
  it('should get trainer successfully', async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    await subscriptionFactory({
      client: client._id,
      trainer: trainer._id,
    });
    const res = await testRequest<UserLoginDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: SUBSCRIPTION_TRAINER,
      token: client.token,
    });
    expect(res.body.firstName).toBe(trainer.firstName);
  });
});
