import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { USER_ROLE } from '../../src/user/user.constants';
import { userFactory } from '../user/user.factory';
import { DIET } from '../endpoints/diet.endpoints';
import { dietFactory } from './diet.factory';
import { AddDietDto } from '../../src/diet/inputs/add-diet.dto';

describe('get diet suite case', () => {
  it('should get diet successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const diet = await dietFactory({ trainer: trainer._id });
    const res = await testRequest<AddDietDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: `${DIET}/${diet._id}`,
      token: trainer.token,
    });
    expect(res.body.notes).toBe(diet.notes);
  });
});
