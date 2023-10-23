import { USER_ROLE } from './../../src/user/user.constants';
import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { buildPlanParams } from './plan.factory';
import { PLAN } from '../endpoints/plan.endpoints';
import { AddPlanDto } from '../../src/plan/inputs/add-plan.dto';
import { userFactory } from '../user/user.factory';

describe('add plan suite case', () => {
  it('should add plan successfully', async () => {
    const user = await userFactory({ role: USER_ROLE.TRAINER });
    const params = await buildPlanParams({ trainerId: user._id });
    delete params.trainerId;
    const res = await testRequest<AddPlanDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: PLAN,
      variables: params,
      token: user.token,
    });
    expect(res.body.title).toBe(params.title);
  });
});
