import { WorkoutExercise } from '../../src/workout-exercise/workout-exercise.schema';
import { exerciseFactory } from '../exercise/exercise.factory';
import { workoutFactory } from '../workout/workout.factory';
import { faker } from '@faker-js/faker';
import { WorkoutExerciseRepo } from './workout-exercise.test-repo';
import { WORKOUT_STAGE } from '../../src/workout-exercise/workout-exercise.constants';

export const buildWorkoutExerciseParams = async (
  obj: Partial<WorkoutExercise> = {},
): Promise<WorkoutExercise> => {
  return {
    exercise: obj.exercise || (await exerciseFactory())._id,
    workout: obj.workout || (await workoutFactory())._id,
    minsDuration: obj.minsDuration || faker.number.int({ max: 100 }),
    sets: obj.sets || [faker.number.int({ max: 100 })],
    stage:
      obj.stage ||
      faker.helpers.arrayElement<WORKOUT_STAGE>(Object.values(WORKOUT_STAGE)),
  };
};

export const workoutExercisesFactory = async (
  count = 10,
  obj: Partial<WorkoutExercise> = {},
): Promise<WorkoutExercise[]> => {
  const workoutExercise: WorkoutExercise[] = [];
  for (let i = 0; i < count; i++) {
    workoutExercise.push(await buildWorkoutExerciseParams(obj));
  }
  return await WorkoutExerciseRepo().addMany(workoutExercise);
};

export const workoutExerciseFactory = async (
  obj: Partial<WorkoutExercise> = {},
): Promise<WorkoutExercise> => {
  const params: Partial<WorkoutExercise> =
    await buildWorkoutExerciseParams(obj);
  return await WorkoutExerciseRepo().add(params);
};
