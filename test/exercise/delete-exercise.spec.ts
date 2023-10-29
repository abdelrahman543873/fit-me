import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { USER_ROLE } from '../../src/user/user.constants';
import { userFactory } from '../user/user.factory';
import { exerciseFactory } from './exercise.factory';
import { EXERCISE } from '../endpoints/exercise.endpoints';
import { DeleteExerciseDto } from '../../src/exercise/inputs/delete-exercise.dto';

describe('delete exercise suite case', () => {
  it('should delete exercise successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const exercise = await exerciseFactory({ trainer: trainer._id });
    const res = await testRequest<DeleteExerciseDto>({
      method: HTTP_METHODS_ENUM.DELETE,
      url: `${EXERCISE}/${exercise._id.toString()}`,
      token: trainer.token,
    });
    expect(res.body.deletedCount).toBe(1);
  });
});
