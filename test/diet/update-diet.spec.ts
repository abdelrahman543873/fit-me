import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { USER_ROLE } from '../../src/user/user.constants';
import { userFactory } from '../user/user.factory';
import { DIET } from '../endpoints/diet.endpoints';
import { buildDietParams, dietFactory } from './diet.factory';
import { AddDietDto } from '../../src/diet/inputs/add-diet.dto';

describe('update diet suite case', () => {
  it('should update diet successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const diet = await dietFactory({ trainer: trainer._id });
    const params = await buildDietParams();
    delete params.trainer;
    const res = await testRequest<AddDietDto>({
      method: HTTP_METHODS_ENUM.PUT,
      url: `${DIET}/${diet._id.toString()}`,
      token: trainer.token,
      fileParam: 'media',
    });
    expect(res.body.trainer).toBe(trainer._id.toString());
    expect(res.body.media).toContain('jpeg');
  });
});
