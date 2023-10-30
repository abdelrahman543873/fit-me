import { WorkoutExerciseRepository } from '../../src/workout-plan/workout-exercise.repository';

export const WorkoutExerciseRepo = (): WorkoutExerciseRepository =>
  global.workoutExerciseRepository;
