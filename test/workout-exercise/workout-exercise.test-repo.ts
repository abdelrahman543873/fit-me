import { WorkoutExerciseRepository } from '../../src/workout-exercise/workout-exercise.repository';

export const WorkoutExerciseRepo = (): WorkoutExerciseRepository =>
  global.workoutExerciseRepository;
