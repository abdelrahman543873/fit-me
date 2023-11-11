import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { USER_ROLE } from '../../src/user/user.constants';
import { userFactory } from '../user/user.factory';
import { buildAnswerParams } from './answer.factory';
import { AddAnswerDto } from '../../src/answer/inputs/add-answer.dto';
import { ANSWER } from '../endpoints/answer.endpoints';
import { subscriptionFactory } from '../subscription/subscription.factory';
import { SUBSCRIPTION_STATUS } from '../../src/subscription/subscription.constants';
import { SubscriptionRepo } from '../subscription/subscription.test-repo';

describe('add answer suite case', () => {
  it('should add answer successfully and change subscription status to pending when all form is answered', async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const params = await buildAnswerParams({ client: client._id });
    delete params.media;
    delete params.client;
    const subscription = await subscriptionFactory({
      client: client._id,
      trainer: trainer._id,
      status: SUBSCRIPTION_STATUS.INITIAL,
    });
    const res = await testRequest<AddAnswerDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: ANSWER,
      token: client.token,
      variables: { ...params, question: params.question.toString() as any },
      fileParam: 'media',
    });
    expect(res.body.text).toBe(params.text);
    expect(res.body.text).toBe(params.text);
    const subscriptionAfterFormCompletion = await SubscriptionRepo().findOne({
      _id: subscription._id,
    });
    await expect(subscriptionAfterFormCompletion.status).toBe(
      SUBSCRIPTION_STATUS.PENDING,
    );
  });
});
