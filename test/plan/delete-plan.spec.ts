import { USER_ROLE } from './../../src/user/user.constants';
import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { planFactory } from './plan.factory';
import { PLAN } from '../endpoints/plan.endpoints';
import { userFactory } from '../user/user.factory';
import { DeletePlanDto } from '../../src/plan/inputs/delete-plan.dto';

describe('delete plan suite case', () => {
  it('should delete plan successfully', async () => {
    const user = await userFactory({ role: USER_ROLE.TRAINER });
    const plan = await planFactory({ trainerId: user._id });
    const res = await testRequest<DeletePlanDto>({
      method: HTTP_METHODS_ENUM.DELETE,
      url: PLAN,
      variables: { id: plan._id.toString() as any },
      token: user.token,
    });
    expect(res.body.deletedCount).toBe(1);
  });

  it('should fail to delete non existing plan', async () => {
    const user = await userFactory({ role: USER_ROLE.TRAINER });
    const res = await testRequest<DeletePlanDto>({
      method: HTTP_METHODS_ENUM.DELETE,
      url: PLAN,
      variables: { id: user._id.toString() as any },
      token: user.token,
    });
    expect(res.body.message).toContain("this plan doesn't exist");
  });
});
