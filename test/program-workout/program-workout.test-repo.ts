import { ProgramWorkoutRepository } from '../../src/program-workout/program-workout.repository';

export const ProgramWorkoutRepo = (): ProgramWorkoutRepository =>
  global.programWorkoutRepository;
