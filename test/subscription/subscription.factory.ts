import { userFactory } from './../user/user.factory';
import { Subscription } from '../../src/subscription/subscription.schema';
import { USER_ROLE } from '../../src/user/user.constants';
import { SubscriptionRepo } from './subscription.test-repo';
import { planFactory } from '../plan/plan.factory';
import { faker } from '@faker-js/faker';
import { SUBSCRIPTION_STATUS } from '../../src/subscription/subscription.constants';

export const buildSubscriptionParams = async (
  obj: Partial<Subscription> = {},
): Promise<Partial<Subscription>> => {
  return {
    client: obj.client || (await userFactory({ role: USER_ROLE.CLIENT }))._id,
    trainer:
      obj.trainer || (await userFactory({ role: USER_ROLE.TRAINER }))._id,
    status:
      obj.status ||
      faker.helpers.arrayElement<SUBSCRIPTION_STATUS>(
        Object.values(SUBSCRIPTION_STATUS),
      ),
    plan: obj.plan || (await planFactory())._id,
    approvedAt: obj.approvedAt || faker.date.past(),
  };
};

export const subscriptionFactory = async (
  obj: Partial<Subscription> = {},
): Promise<Subscription> => {
  const params: Partial<Subscription> = await buildSubscriptionParams(obj);
  return await SubscriptionRepo().add(params);
};
