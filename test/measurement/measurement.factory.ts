import { Measurement } from '../../src/measurement/measurement.schema';
import { userFactory } from '../user/user.factory';
import { faker } from '@faker-js/faker';
import {
  MEASUREMENT_CATEGORY,
  MEASUREMENT_CATEGORY_ENUM,
  MEASUREMENT_CATEGORY_UNITS,
  MEASUREMENT_TYPE,
} from '../../src/measurement/measurement.constants';
import { MeasurementRepo } from './measurement.test-repo';
import { USER_ROLE } from '../../src/user/user.constants';

export const buildMeasurementParams = async (
  obj: Partial<Measurement> = {},
): Promise<Measurement> => {
  const type =
    obj.type ||
    faker.helpers.arrayElement<MEASUREMENT_TYPE>(
      Object.values(MEASUREMENT_TYPE),
    );
  const unit =
    obj.unit ||
    (MEASUREMENT_CATEGORY_UNITS[MEASUREMENT_CATEGORY[type]]
      ? MEASUREMENT_CATEGORY_UNITS[MEASUREMENT_CATEGORY[type]][0]
      : null);
  return {
    client: obj.client || (await userFactory({ role: USER_ROLE.CLIENT }))._id,
    measuredAt: obj.measuredAt || faker.date.past(),
    ...(MEASUREMENT_CATEGORY[type] === MEASUREMENT_CATEGORY_ENUM.IMAGE && {
      media: obj.media || faker.internet.url(),
    }),
    type: obj.type || type,
    ...(unit && { unit: obj.unit || unit }),
    ...(MEASUREMENT_CATEGORY[type] !== MEASUREMENT_CATEGORY_ENUM.IMAGE && {
      value: obj.value || faker.number.int({ max: 300 }),
    }),
  };
};

export const measurementFactory = async (
  obj: Partial<Measurement> = {},
): Promise<Measurement> => {
  const params: Partial<Measurement> = await buildMeasurementParams(obj);
  return await MeasurementRepo().add(params);
};
