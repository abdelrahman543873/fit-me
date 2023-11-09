import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { subscriptionFactory } from './subscription.factory';
import { CHOOSE_PLAN } from '../endpoints/subscription.endpoint';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { ChoosePlanDto } from '../../src/subscription/inputs/choose-plan.dto';
import { planFactory } from '../plan/plan.factory';

describe('choose plan suite case', () => {
  it('should choose plan successfully', async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    await subscriptionFactory({
      client: client._id,
      trainer: trainer._id,
    });
    const plan = await planFactory();
    const res = await testRequest<ChoosePlanDto>({
      method: HTTP_METHODS_ENUM.PUT,
      url: CHOOSE_PLAN,
      token: client.token,
      variables: { id: plan._id.toString() as any },
    });
    expect(res.body.plan).toBe(plan._id.toString());
  });
});
