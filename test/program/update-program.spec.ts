import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { buildProgramParams, programFactory } from './program.factory';
import { PROGRAM } from '../endpoints/program.endpoints';
import { UpdateProgramDto } from '../../src/program/inputs/update-program.dto';

describe('update program suite case', () => {
  it('should update program successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const program = await programFactory({ trainer: trainer._id });
    const programParams = await buildProgramParams({ trainer: trainer._id });
    const res = await testRequest<UpdateProgramDto>({
      method: HTTP_METHODS_ENUM.PUT,
      url: `${PROGRAM}/${program._id.toString()}`,
      variables: { title: programParams.title },
      token: trainer.token,
    });
    expect(res.body.title).toBe(programParams.title);
  });
});
