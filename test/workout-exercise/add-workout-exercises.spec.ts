import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { buildWorkoutExerciseParams } from './workout-exercise.factory';
import { WORKOUT_EXERCISE_BULK } from '../endpoints/workout-exercise.endpoints';
import { exerciseFactory } from '../exercise/exercise.factory';
import { workoutFactory } from '../workout/workout.factory';
import { AddWorkoutExercisesDto } from '../../src/workout-exercise/inputs/add-workout-exercises.dto';

describe('add workout exercise suite case', () => {
  it('should add workout exercise successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const exercise = await exerciseFactory({ trainer: trainer._id });
    const workout = await workoutFactory({ trainer: trainer._id });
    const workoutExercise = await buildWorkoutExerciseParams({
      exercise: exercise._id,
      workout: workout._id,
    });
    const res = await testRequest<AddWorkoutExercisesDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: WORKOUT_EXERCISE_BULK,
      variables: { workoutExercises: [workoutExercise] },
      token: trainer.token,
    });
    expect(res.body[0].stage).toBe(workoutExercise.stage);
  });

  it('should throw error if not workout owner', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const exercise = await exerciseFactory({ trainer: trainer._id });
    const workoutExercise = await buildWorkoutExerciseParams({
      exercise: exercise._id,
    });
    const res = await testRequest<AddWorkoutExercisesDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: WORKOUT_EXERCISE_BULK,
      variables: { workoutExercises: [workoutExercise] },
      token: trainer.token,
    });
    expect(res.body.message).toContain(
      'workoutExercises.0.unauthorized workout',
    );
  });

  it('should throw error if not exercise owner', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const exercise = await exerciseFactory({ trainer: trainer._id });
    const workoutExercise = await buildWorkoutExerciseParams({
      exercise: exercise._id,
    });
    const res = await testRequest<AddWorkoutExercisesDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: WORKOUT_EXERCISE_BULK,
      variables: { workoutExercises: [workoutExercise] },
      token: trainer.token,
    });
    expect(res.body.message).toContain(
      'workoutExercises.0.unauthorized workout',
    );
  });
});
