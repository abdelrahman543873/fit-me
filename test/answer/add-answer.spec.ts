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
import { waitForMilliSeconds } from '../utils/wait-for.util';
import { questionFactory } from '../question/question.factory';
import { formFactory } from '../form/form.factory';
import { FORM_TYPES } from '../../src/form/form.constants';
import { followUpFactory } from '../follow-up/follow-up.factory';

describe('add answer suite case', () => {
  it('should add answer successfully and change subscription status to pending when all form is answered', async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const form = await formFactory({
      type: FORM_TYPES.ONBOARDING,
      trainer: trainer._id,
    });
    const question = await questionFactory({ form: form._id });
    const params = await buildAnswerParams({
      client: client._id,
      question: question._id,
    });
    delete params.media;
    delete params.client;
    delete params.followUp;
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
    await waitForMilliSeconds(10);
    const subscriptionAfterFormCompletion = await SubscriptionRepo().findOne({
      _id: subscription._id,
    });
    await expect(subscriptionAfterFormCompletion.status).toBe(
      SUBSCRIPTION_STATUS.PENDING,
    );
  });

  it('should fail if the question is of another form than specified in the follow up', async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const form = await formFactory({
      type: FORM_TYPES.FOLLOW_UP,
      trainer: trainer._id,
    });
    const question = await questionFactory({ form: form._id });
    const params = await buildAnswerParams({
      client: client._id,
      question: question._id,
    });
    delete params.media;
    delete params.client;
    const res = await testRequest<AddAnswerDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: ANSWER,
      token: client.token,
      variables: {
        ...params,
        question: params.question.toString() as any,
        followUp: params.followUp.toString() as any,
      },
      fileParam: 'media',
    });
    expect(res.body.message).toContain(
      "this question doesn't belong to this follow up",
    );
  });

  it('should succeed to add follow up answer', async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const form = await formFactory({
      type: FORM_TYPES.FOLLOW_UP,
      trainer: trainer._id,
    });
    const question = await questionFactory({ form: form._id });
    const followUp = await followUpFactory({ form: form._id });
    const params = await buildAnswerParams({
      client: client._id,
      question: question._id,
      followUp: followUp._id,
    });
    delete params.media;
    delete params.client;
    const res = await testRequest<AddAnswerDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: ANSWER,
      token: client.token,
      variables: {
        ...params,
        question: params.question.toString() as any,
        followUp: params.followUp.toString() as any,
      },
      fileParam: 'media',
    });
    expect(res.body.question).toBe(question._id.toString());
    expect(res.body.followUp).toBe(followUp._id.toString());
    // waiting for events to be propagated for jest not to close connection too early
    await waitForMilliSeconds(1);
  });
});
