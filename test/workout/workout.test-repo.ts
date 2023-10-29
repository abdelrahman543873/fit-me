import { WorkoutRepository } from '../../src/workout/workout.repository';

export const WorkoutRepo = (): WorkoutRepository => global.workoutRepository;
