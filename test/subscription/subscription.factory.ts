import { userFactory } from './../user/user.factory';
import { Subscription } from '../../src/subscription/subscription.schema';
import { USER_ROLE } from '../../src/user/user.constants';
import { SubscriptionRepo } from './subscription.test-repo';
import { planFactory } from '../plan/plan.factory';

export const buildSubscriptionParams = async (
  obj: Partial<Subscription> = {},
): Promise<Partial<Subscription>> => {
  return {
    client: obj.client || (await userFactory({ role: USER_ROLE.CLIENT }))._id,
    trainer:
      obj.trainer || (await userFactory({ role: USER_ROLE.TRAINER }))._id,
    accepted: obj.accepted || false,
    plan: obj.plan || (await planFactory())._id,
  };
};

export const subscriptionFactory = async (
  obj: Partial<Subscription> = {},
): Promise<Subscription> => {
  const params: Partial<Subscription> = await buildSubscriptionParams(obj);
  return await SubscriptionRepo().add(params);
};
