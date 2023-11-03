import { workoutFactory } from './../workout/workout.factory';
import { ProgramWorkout } from '../../src/program-workout/program-workout.schema';
import { programFactory } from '../program/program.factory';
import { ProgramWorkoutRepo } from './program-workout.test-repo';

export const buildProgramWorkoutParams = async (
  obj: Partial<ProgramWorkout> = {},
): Promise<ProgramWorkout> => {
  return {
    workout: obj.workout || (await workoutFactory())._id,
    program: obj.program || (await programFactory())._id,
  };
};

export const programWorkoutFactory = async (
  obj: Partial<ProgramWorkout> = {},
): Promise<ProgramWorkout> => {
  const params: Partial<ProgramWorkout> = await buildProgramWorkoutParams(obj);
  return await ProgramWorkoutRepo().add(params);
};
