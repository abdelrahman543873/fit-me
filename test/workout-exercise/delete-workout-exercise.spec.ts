import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { workoutExerciseFactory } from './workout-exercise.factory';
import { WORKOUT_EXERCISE } from '../endpoints/workout-exercise.endpoints';
import { exerciseFactory } from '../exercise/exercise.factory';
import { workoutFactory } from '../workout/workout.factory';
import { DeleteWorkoutExerciseDto } from '../../src/workout-exercise/inputs/delete-workout-exercise.dto';

describe('delete workout exercise suite case', () => {
  it('should delete workout exercise successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const exercise = await exerciseFactory({ trainer: trainer._id });
    const workout = await workoutFactory({ trainer: trainer._id });
    const workoutExercise = await workoutExerciseFactory({
      exercise: exercise._id,
      workout: workout._id,
    });
    const res = await testRequest<DeleteWorkoutExerciseDto>({
      method: HTTP_METHODS_ENUM.DELETE,
      url: WORKOUT_EXERCISE,
      variables: { id: workoutExercise._id },
      token: trainer.token,
    });
    expect(res.body.deletedCount).toBe(1);
  });

  it('should throw an error for unauthorized users', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const exercise = await exerciseFactory({ trainer: trainer._id });
    const workoutExercise = await workoutExerciseFactory({
      exercise: exercise._id,
    });
    const res = await testRequest<DeleteWorkoutExerciseDto>({
      method: HTTP_METHODS_ENUM.DELETE,
      url: WORKOUT_EXERCISE,
      variables: { id: workoutExercise._id },
      token: trainer.token,
    });
    expect(res.body.message).toContain('unauthorized workout exercise');
  });
});
