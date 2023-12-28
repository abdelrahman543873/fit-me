import { userFactory } from './../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { Observation } from '../../src/observation/observation.schema';
import { ObservationRepo } from './observation.test-repo';
import { faker } from '@faker-js/faker';
import { OBSERVATION_TYPE } from '../../src/observation/observation.constants';

export const buildObservationParams = async (
  obj: Partial<Observation> = {},
): Promise<Observation> => {
  return {
    client: obj.client || (await userFactory({ role: USER_ROLE.CLIENT }))._id,
    note: obj.note || faker.commerce.productDescription(),
    type:
      obj.type ||
      faker.helpers.arrayElement<OBSERVATION_TYPE>(
        Object.values(OBSERVATION_TYPE),
      ),
    trainer:
      obj.trainer || (await userFactory({ role: USER_ROLE.TRAINER }))._id,
    title: obj.title || faker.commerce.productName(),
  };
};

export const observationFactory = async (
  obj: Partial<Observation> = {},
): Promise<Observation> => {
  const params: Partial<Observation> = await buildObservationParams(obj);
  return await ObservationRepo().add(params);
};
