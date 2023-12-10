import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { clientProgramFactory } from './client-program.factory';
import { CLIENT_PROGRAM_WORKOUTS } from '../endpoints/client-program.endpoints';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { FilterClientProgramDto } from '../../src/client-program/inputs/filter-client-program.dto';
import { programWorkoutsFactory } from '../program-workout/program-workout.factory';

describe('get workouts suite case', () => {
  it('should get workouts successfully', async () => {
    const user = await userFactory({ role: USER_ROLE.CLIENT });
    const clientProgram = await clientProgramFactory({
      client: user._id,
    });
    const workouts = await programWorkoutsFactory(4, {
      program: clientProgram.program,
    });
    const res = await testRequest<FilterClientProgramDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: CLIENT_PROGRAM_WORKOUTS,
      token: user.token,
    });
    expect(res.body[0]._id).toBe(workouts[0].workout.toString());
  });
});
