import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { formFactory } from './form.factory';
import { ANSWERED_FORMS } from '../endpoints/form.endpoints';
import { USER_ROLE } from '../../src/user/user.constants';
import { userFactory } from '../user/user.factory';
import { questionFactory } from '../question/question.factory';
import { GetAnsweredFormsDto } from '../../src/form/inputs/get-answered-forms.dto';
import { clientFactory } from '../client/client.factory';
import { followUpFactory } from '../follow-up/follow-up.factory';
import { answerFactory } from '../answer/answer.factory';
import { subscriptionFactory } from '../subscription/subscription.factory';
import { FORM_TYPES } from '../../src/form/form.constants';
import { FOLLOW_UP_STATUS } from '../../src/follow-up/follow-up.constants';

describe('get answered forms suite case', () => {
  it('should get answered forms as trainer for my clients and onboarding forms and filter based on follow up status successfully successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const client = await clientFactory();
    const form = await formFactory({
      trainer: trainer._id,
      type: FORM_TYPES.FOLLOW_UP,
    });
    const onboardingForm = await formFactory({
      trainer: trainer._id,
      type: FORM_TYPES.ONBOARDING,
    });
    const onboardingQuestion = await questionFactory({
      form: onboardingForm._id,
    });
    const onboardingAnswer = await answerFactory({
      client: client._id,
      question: onboardingQuestion._id,
    });
    const question = await questionFactory({ form: form._id });
    const followUp = await followUpFactory({
      client: client._id,
      trainer: trainer._id,
      form: form._id,
      status: FOLLOW_UP_STATUS.COMPLETED,
    });
    const secondFollowUp = await followUpFactory({
      client: client._id,
      trainer: trainer._id,
      form: form._id,
      status: FOLLOW_UP_STATUS.COMPLETED,
    });
    const firstAnswer = await answerFactory({
      question: question._id,
      client: client._id,
      followUp: followUp._id,
    });
    const secondAnswer = await answerFactory({
      question: question._id,
      client: client._id,
      followUp: secondFollowUp._id,
    });
    const res = await testRequest<GetAnsweredFormsDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: ANSWERED_FORMS,
      token: trainer.token,
      params: {
        client: client._id.toString() as any,
      },
    });
    expect(res.body[0].questions[0].answer.text).toBe(firstAnswer.text);
    expect(res.body[0].questions[0].answer.followUp).toBe(
      followUp._id.toString(),
    );
    expect(res.body[1].questions[0].answer.text).toBe(secondAnswer.text);
    expect(res.body[1].questions[0].answer.followUp).toBe(
      secondFollowUp._id.toString(),
    );
    expect(res.body[2].questions[0].answer.text).toBe(onboardingAnswer.text);
    expect(res.body[2].questions[0].answer._id).toBe(
      onboardingAnswer._id.toString(),
    );
  });

  it('should get answered forms as client for my forms successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    await subscriptionFactory({ client: client._id, trainer: trainer._id });
    const form = await formFactory({
      trainer: trainer._id,
      type: FORM_TYPES.FOLLOW_UP,
    });
    const onboardingForm = await formFactory({
      trainer: trainer._id,
      type: FORM_TYPES.ONBOARDING,
    });
    const onBoardingQuestion = await questionFactory({
      form: onboardingForm._id,
    });
    const formNotBelongingToTheUser = await formFactory({
      trainer: trainer._id,
    });
    const question = await questionFactory({ form: form._id });
    const followUp = await followUpFactory({
      client: client._id,
      trainer: trainer._id,
      form: form._id,
    });
    const secondFollowUp = await followUpFactory({
      client: client._id,
      trainer: trainer._id,
      form: form._id,
    });
    const firstAnswer = await answerFactory({
      question: question._id,
      client: client._id,
      followUp: followUp._id,
    });
    const secondAnswer = await answerFactory({
      question: question._id,
      client: client._id,
      followUp: secondFollowUp._id,
    });
    //onboarding form question answer
    await answerFactory({
      question: onBoardingQuestion._id,
      client: client._id,
    });
    const res = await testRequest<GetAnsweredFormsDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: ANSWERED_FORMS,
      token: client.token,
    });
    expect(res.body[0].questions[0].answer.text).toBe(firstAnswer.text);
    expect(res.body[0].questions[0].answer.followUp).toBe(
      followUp._id.toString(),
    );
    expect(res.body[1].questions[0].answer.text).toBe(secondAnswer.text);
    expect(res.body[1].questions[0].answer.followUp).toBe(
      secondFollowUp._id.toString(),
    );
    const responseFormIds = res.body.map((form) => {
      return form._id;
    });
    expect(responseFormIds).not.toContain(
      formNotBelongingToTheUser._id.toString(),
    );
    expect(responseFormIds).toContain(onboardingForm._id.toString());
  });
});
