import { faker } from '@faker-js/faker';
import { Workout } from '../../src/workout/workout.schema';
import { WorkoutRepo } from './workout.test-repo';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';

export const buildWorkoutParams = async (
  obj: Partial<Workout> = {},
): Promise<Partial<Workout>> => {
  return {
    trainer:
      obj.trainer || (await userFactory({ role: USER_ROLE.TRAINER }))._id,
    title: obj.title || faker.word.noun(),
  };
};

export const workoutFactory = async (
  obj: Partial<Workout> = {},
): Promise<Workout> => {
  const params: Partial<Workout> = await buildWorkoutParams(obj);
  return await WorkoutRepo().add(params);
};
