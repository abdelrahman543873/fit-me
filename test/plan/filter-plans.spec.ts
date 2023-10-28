import { USER_ROLE } from './../../src/user/user.constants';
import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { planFactory } from './plan.factory';
import { FILTER_PLANS } from '../endpoints/plan.endpoints';
import { userFactory } from '../user/user.factory';
import { FilterPlansDto } from '../../src/plan/inputs/filter-plans.dto';

describe('filter plans suite case', () => {
  it('should filter plans successfully', async () => {
    const user = await userFactory({ role: USER_ROLE.TRAINER });
    const plan = await planFactory({ trainer: user._id });
    const res = await testRequest<FilterPlansDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: FILTER_PLANS,
      token: user.token,
    });
    expect(res.body[0].title).toBe(plan.title);
    expect(res.body[0].description).toBe(plan.description);
  });
});
