import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { WORKOUT } from '../endpoints/workout.endpoints';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { workoutFactory } from './workout.factory';
import { workoutExercisesFactory } from '../workout-exercise/workout-exercise.factory';
import { WorkoutExerciseRepo } from '../workout-exercise/workout-exercise.test-repo';

describe('delete workout suite case', () => {
  it('should delete workout successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const workout = await workoutFactory({ trainer: trainer._id });
    const anotherWorkout = await workoutFactory({ trainer: trainer._id });
    await workoutExercisesFactory(10, { workout: workout._id });
    await workoutExercisesFactory(10, {
      workout: anotherWorkout._id,
    });
    const workoutExercisesCount = await WorkoutExerciseRepo().count({
      workout: workout._id,
    });
    expect(workoutExercisesCount).toBe(10);
    const anotherWorkoutExercisesCount = await WorkoutExerciseRepo().count({
      workout: anotherWorkout._id,
    });
    expect(anotherWorkoutExercisesCount).toBe(10);
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.DELETE,
      url: `${WORKOUT}/${workout._id.toString()}`,
      token: trainer.token,
    });
    expect(res.body.deletedCount).toBe(1);
    const workoutExercisesCountAfterDelete = await WorkoutExerciseRepo().count({
      workout: workout._id,
    });
    expect(workoutExercisesCountAfterDelete).toBe(0);
    const anotherWorkoutExercisesCountAfterDelete =
      await WorkoutExerciseRepo().count({
        workout: anotherWorkout._id,
      });
    expect(anotherWorkoutExercisesCountAfterDelete).toBe(10);
  });
});
