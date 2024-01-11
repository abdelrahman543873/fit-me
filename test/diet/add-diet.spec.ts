import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { USER_ROLE } from '../../src/user/user.constants';
import { userFactory } from '../user/user.factory';
import { DIET } from '../endpoints/diet.endpoints';
import { buildDietParams } from './diet.factory';
import { AddDietDto } from '../../src/diet/inputs/add-diet.dto';

describe('add diet suite case', () => {
  it('should add diet successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const params = await buildDietParams();
    delete params.trainer;
    const res = await testRequest<AddDietDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: DIET,
      token: trainer.token,
      fileParam: 'media',
    });
    expect(res.body.trainer).toBe(trainer._id.toString());
    expect(res.body.media).toContain('jpeg');
  });
});
