import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { programFactory } from './program.factory';
import { FILTER_PROGRAMS } from '../endpoints/program.endpoints';
import { programWorkoutFactory } from '../program-workout/program-workout.factory';
import { workoutFactory } from '../workout/workout.factory';

describe('filter programs suite case', () => {
  it('should filter programs successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const program = await programFactory({ trainer: trainer._id });
    const workout = await workoutFactory({ trainer: trainer._id });
    const programWorkout = await programWorkoutFactory({
      program: program._id,
      workout: workout._id,
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: FILTER_PROGRAMS,
      token: trainer.token,
    });
    expect(res.body[0].workouts[0].workout._id).toBe(workout._id.toString());
    expect(res.body[0].workouts[0].workout.title).toBe(workout.title);
    expect(res.body[0].workouts[0]._id).toBe(programWorkout._id.toString());
  });
});
