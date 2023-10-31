import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { FILTER_WORKOUTS } from '../endpoints/workout.endpoints';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { workoutFactory } from './workout.factory';
import { AddWorkoutDto } from '../../src/workout/inputs/add-workout.dto';
import { workoutExercisesFactory } from '../workout-plan/workout-exercise.factory';
import { WORKOUT_STAGE } from '../../src/workout-plan/workout-exercise.constants';

describe('filter workout exercise suite case', () => {
  it('should filter workout exercise successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const workout = await workoutFactory({ trainer: trainer._id });
    await workoutExercisesFactory(10, {
      workout: workout._id,
    });
    const res = await testRequest<AddWorkoutDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: FILTER_WORKOUTS,
      token: trainer.token,
    });
    expect(res.body[0].title).toBe(workout.title);
    expect(res.body[0]['WARM_UP'][0].exercise.title).toBeTruthy();
    expect(res.body[0]['WARM_UP'][0].stage).toBe(WORKOUT_STAGE.WARM_UP);
    expect(res.body[0]['WARM_UP'][0].workout).toBe(workout._id.toString());
  });
});
