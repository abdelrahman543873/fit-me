import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { AddWorkoutDto } from '../../src/workout/inputs/add-workout.dto';
import { buildProgramParams } from './program.factory';
import { PROGRAM } from '../endpoints/program.endpoints';

describe('add program suite case', () => {
  it('should add program successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const workout = await buildProgramParams({ trainer: trainer._id });
    const res = await testRequest<AddWorkoutDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: PROGRAM,
      variables: { title: workout.title },
      token: trainer.token,
    });
    expect(res.body.title).toBe(workout.title);
  });
});
