import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { programFactory } from './program.factory';
import { PROGRAM } from '../endpoints/program.endpoints';

describe('get program suite case', () => {
  it('should get program successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const program = await programFactory({ trainer: trainer._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${PROGRAM}/${program._id.toString()}`,
      token: trainer.token,
    });
    expect(res.body.title).toBe(program.title);
  });
});
