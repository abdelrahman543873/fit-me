import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { USER_ROLE } from '../../src/user/user.constants';
import { userFactory } from '../user/user.factory';
import { exerciseFactory } from './exercise.factory';
import { EXERCISE } from '../endpoints/exercise.endpoints';
import { AddExerciseDto } from '../../src/exercise/inputs/add-exercise.dto';

describe('exercise suite case', () => {
  it('should get exercise successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const exercise = await exerciseFactory({ trainer: trainer._id });
    const res = await testRequest<AddExerciseDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: `${EXERCISE}/${exercise._id.toString()}`,
      token: trainer.token,
    });
    expect(res.body.title).toBe(exercise.title);
  });
});
