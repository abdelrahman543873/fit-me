import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { USER_ROLE } from '../../src/user/user.constants';
import { userFactory } from '../user/user.factory';
import { buildExerciseParams, exerciseFactory } from './exercise.factory';
import { EXERCISE } from '../endpoints/exercise.endpoints';
import { UpdateExerciseDto } from '../../src/exercise/inputs/update-exercise.dto';

describe('update exercise suite case', () => {
  it('should update exercise successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const exercise = await exerciseFactory({ trainer: trainer._id });
    const exerciseParams = await buildExerciseParams();
    delete exerciseParams.trainer;
    const res = await testRequest<UpdateExerciseDto>({
      method: HTTP_METHODS_ENUM.PUT,
      url: `${EXERCISE}/${exercise._id.toString()}`,
      token: trainer.token,
      fileParam: 'media',
      variables: exerciseParams,
    });
    expect(res.body.title).toBe(exerciseParams.title);
    expect(res.body.muscleGroup).toBe(exerciseParams.muscleGroup);
  });
});
