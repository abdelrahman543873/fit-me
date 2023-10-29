import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { USER_ROLE } from '../../src/user/user.constants';
import { userFactory } from '../user/user.factory';
import { buildExerciseParams } from './exercise.factory';
import { EXERCISE } from '../endpoints/exercise.endpoints';
import { AddExerciseDto } from '../../src/exercise/inputs/add-exercise.dto';

describe('exercise suite case', () => {
  it('should add exercise successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const exercise = await buildExerciseParams({ trainer: trainer._id });
    const res = await testRequest<AddExerciseDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: EXERCISE,
      token: trainer.token,
      variables: {
        muscleGroup: exercise.muscleGroup,
        title: exercise.title,
        instructions: exercise.instructions,
        links: exercise.links,
      },
      fileParam: 'media',
    });
    expect(res.body.title).toBe(exercise.title);
    expect(res.body.instructions).toBe(exercise.instructions);
  });
});
