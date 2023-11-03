import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { workoutFactory } from '../workout/workout.factory';
import { programWorkoutFactory } from './program-workout.factory';
import { PROGRAM_WORKOUT } from '../endpoints/program-workout.endpoints';
import { AddProgramWorkoutsDto } from '../../src/program-workout/inputs/add-program-workouts.dto';
import { programFactory } from '../program/program.factory';

describe('delete program workout suite case', () => {
  it('should delete program workouts successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const workout = await workoutFactory({ trainer: trainer._id });
    const program = await programFactory({ trainer: trainer._id });
    const programWorkout = await programWorkoutFactory({
      workout: workout._id,
      program: program._id,
    });
    const res = await testRequest<AddProgramWorkoutsDto>({
      method: HTTP_METHODS_ENUM.DELETE,
      url: `${PROGRAM_WORKOUT}/${programWorkout._id.toString()}`,
      token: trainer.token,
    });
    expect(res.body.deletedCount).toBe(1);
  });
});
