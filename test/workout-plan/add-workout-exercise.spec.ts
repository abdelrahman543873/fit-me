import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { buildWorkoutExerciseParams } from './workout-exercise.factory';
import { WORKOUT_EXERCISE } from '../endpoints/workout-exercise.endpoints';
import { AddWorkoutExerciseDto } from '../../src/workout-plan/inputs/add-workout-exercise.dto';

describe('add workout exercise suite case', () => {
  it('should add workout exercise successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const workoutExercise = await buildWorkoutExerciseParams();
    const res = await testRequest<AddWorkoutExerciseDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: WORKOUT_EXERCISE,
      variables: workoutExercise,
      token: trainer.token,
    });
    expect(res.body.stage).toBe(workoutExercise.stage);
    expect(res.body.sets).toBe(workoutExercise.sets);
  });
});
