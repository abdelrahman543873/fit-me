import { userFactory } from './../user/user.factory';
import { Trainer } from '../../src/trainer/trainer.schema';
import { TrainerRepo } from './trainer.test-repo';
import { USER_ROLE } from '../../src/user/user.constants';

export const buildTrainerParams = async (
  obj: Partial<Trainer> = {},
): Promise<Partial<Trainer>> => {
  return {
    _id: obj._id || (await userFactory({ role: USER_ROLE.TRAINER }))._id,
  };
};

export const trainerFactory = async (
  obj: Partial<Trainer> = {},
): Promise<Trainer> => {
  const params: Partial<Trainer> = await buildTrainerParams(obj);
  return await TrainerRepo().add({
    ...params,
  });
};
