import { ExerciseRepository } from '../../src/exercise/exercise.repository';

export const ExerciseRepo = (): ExerciseRepository => global.exerciseRepository;
