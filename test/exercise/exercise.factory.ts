import { faker } from '@faker-js/faker';
import { Exercise } from '../../src/exercise/exercise.schema';
import { ExerciseRepo } from './exercise.test-repo';
import { MUSCLE_GROUP } from '../../src/exercise/exercise.constants';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';

export const buildExerciseParams = async (
  obj: Partial<Exercise> = {},
): Promise<Partial<Exercise>> => {
  return {
    title: obj.title || faker.word.noun(),
    muscleGroup:
      obj.muscleGroup ||
      faker.helpers.arrayElement<MUSCLE_GROUP>(Object.values(MUSCLE_GROUP)),
    instructions: obj.instructions || faker.commerce.productDescription(),
    trainer:
      obj.trainer || (await userFactory({ role: USER_ROLE.TRAINER }))._id,
    media: obj.media || [faker.internet.url()],
    links: obj.links || [faker.internet.url()],
  };
};

export const exerciseFactory = async (
  obj: Partial<Exercise> = {},
): Promise<Exercise> => {
  const params: Partial<Exercise> = await buildExerciseParams(obj);
  return await ExerciseRepo().add(params);
};
