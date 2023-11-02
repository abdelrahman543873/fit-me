import { faker } from '@faker-js/faker';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { ProgramRepo } from './program.test-repo';
import { Program } from '../../src/program/program.schema';

export const buildProgramParams = async (
  obj: Partial<Program> = {},
): Promise<Partial<Program>> => {
  return {
    trainer:
      obj.trainer || (await userFactory({ role: USER_ROLE.TRAINER }))._id,
    title: obj.title || faker.word.noun(),
  };
};

export const programFactory = async (
  obj: Partial<Program> = {},
): Promise<Program> => {
  const params: Partial<Program> = await buildProgramParams(obj);
  return await ProgramRepo().add(params);
};
