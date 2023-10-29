import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { USER_ROLE } from '../../src/user/user.constants';
import { userFactory } from '../user/user.factory';
import { exerciseFactory } from './exercise.factory';
import { FILTER_EXERCISES } from '../endpoints/exercise.endpoints';
import { FilterExercisesDto } from '../../src/exercise/inputs/filter-exercises.dto';

describe('exercise suite case', () => {
  it('should filter exercises successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const exercise = await exerciseFactory({ trainer: trainer._id });
    const res = await testRequest<FilterExercisesDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: FILTER_EXERCISES,
      token: trainer.token,
    });
    expect(res.body[0].title).toBe(exercise.title);
    expect(res.body[0].instructions).toBe(exercise.instructions);
  });
});
