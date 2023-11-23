import { clientFactory } from './../client/client.factory';
import { userFactory } from './../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { FollowUp } from '../../src/follow-up/follow-up.schema';
import { FollowUpRepo } from './follow-up.test-repo';
import { faker } from '@faker-js/faker';
import { MEASUREMENT_TYPE } from '../../src/measurement/measurement.constants';
import { formFactory } from '../form/form.factory';
import { FOLLOW_UP_STATUS } from '../../src/follow-up/follow-up.constants';

export const buildFollowUpParams = async (
  obj: Partial<FollowUp> = {},
): Promise<FollowUp> => {
  return {
    client: obj.client || (await clientFactory())._id,
    trainer:
      obj.trainer || (await userFactory({ role: USER_ROLE.TRAINER }))._id,
    measurementType:
      obj.measurementType ||
      faker.helpers.arrayElement<MEASUREMENT_TYPE>(
        Object.values(MEASUREMENT_TYPE),
      ),
    form: obj.form || (await formFactory())._id,
    status:
      obj.status ||
      faker.helpers.arrayElement<FOLLOW_UP_STATUS>(
        Object.values(FOLLOW_UP_STATUS),
      ),
  };
};

export const followUpFactory = async (
  obj: Partial<FollowUp> = {},
): Promise<FollowUp> => {
  const params: Partial<FollowUp> = await buildFollowUpParams(obj);
  return await FollowUpRepo().add(params);
};
