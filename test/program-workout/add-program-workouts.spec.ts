import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { WORKOUT_EXERCISE_BULK } from '../endpoints/workout-exercise.endpoints';
import { exerciseFactory } from '../exercise/exercise.factory';
import { workoutFactory } from '../workout/workout.factory';
import { AddWorkoutExercisesDto } from '../../src/workout-exercise/inputs/add-workout-exercises.dto';
import { buildProgramWorkoutParams } from './program-workout.factory';
import { PROGRAM_WORKOUT_BULK } from '../endpoints/program-workout.endpoints';
import { AddProgramWorkoutsDto } from '../../src/program-workout/inputs/add-program-workouts.dto';
import { programFactory } from '../program/program.factory';

describe('add program workouts exercise suite case', () => {
  it('should add program workouts successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const workout = await workoutFactory({ trainer: trainer._id });
    const program = await programFactory({ trainer: trainer._id });
    const programWorkoutParams = await buildProgramWorkoutParams({
      workout: workout._id,
      program: program._id,
    });
    const res = await testRequest<AddProgramWorkoutsDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: PROGRAM_WORKOUT_BULK,
      variables: { programWorkouts: [programWorkoutParams] },
      token: trainer.token,
    });
    expect(res.body[0].program).toBe(program._id.toString());
    expect(res.body[0].workout).toBe(workout._id.toString());
  });

  it('should throw error if not program owner', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const program = await programFactory({ trainer: trainer._id });
    const programWorkoutParams = await buildProgramWorkoutParams({
      program: program._id,
    });
    const res = await testRequest<AddProgramWorkoutsDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: PROGRAM_WORKOUT_BULK,
      variables: { programWorkouts: [programWorkoutParams] },
      token: trainer.token,
    });
    expect(res.body.message).toContain(
      'programWorkouts.0.unauthorized workout',
    );
  });
});
