import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { programFactory } from './program.factory';
import { PROGRAM } from '../endpoints/program.endpoints';
import { programWorkoutFactory } from '../program-workout/program-workout.factory';
import { ProgramWorkoutRepo } from '../program-workout/program-workout.test-repo';

describe('delete program suite case', () => {
  it('should delete program successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const program = await programFactory({ trainer: trainer._id });
    await programWorkoutFactory({
      program: program._id,
    });
    const programWorkoutCount = await ProgramWorkoutRepo().count({
      program: program._id,
    });
    expect(programWorkoutCount).toBe(1);
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.DELETE,
      url: `${PROGRAM}/${program._id.toString()}`,
      token: trainer.token,
    });
    expect(res.body.deletedCount).toBe(1);
    const programWorkoutCountAfterDelete = await ProgramWorkoutRepo().count({
      program: program._id,
    });
    expect(programWorkoutCountAfterDelete).toBe(0);
  });
});
