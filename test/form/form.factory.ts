import { Form } from '../../src/form/form.schema';
import { faker } from '@faker-js/faker';
import { FormRepo } from './form.test-repo';
import { FORM_TYPES } from '../../src/form/form.constants';
import { userFactory } from '../user/user.factory';

export const buildFormParams = async (
  obj: Partial<Form> = {},
): Promise<Partial<Form>> => {
  return {
    title: obj.title || faker.word.noun(),
    trainerId: obj.trainerId || (await userFactory())._id,
    type:
      obj.type ||
      faker.helpers.arrayElement<FORM_TYPES>(Object.values(FORM_TYPES)),
  };
};

export const formFactory = async (obj: Partial<Form> = {}): Promise<Form> => {
  const params: Partial<Form> = await buildFormParams(obj);
  return await FormRepo().add({
    ...params,
  });
};
