import { formFactory } from './../form/form.factory';
import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { USER_ROLE } from '../../src/user/user.constants';
import { userFactory } from '../user/user.factory';
import { questionFactory } from './question.factory';
import { UNANSWERED_QUESTIONS } from '../endpoints/question.endpoints';
import { GetUnansweredQuestionsDto } from '../../src/question/inputs/get-unanswered-questions.dto';
import { answerFactory } from '../answer/answer.factory';
import { followUpFactory } from '../follow-up/follow-up.factory';
import { FORM_TYPES } from '../../src/form/form.constants';

describe('get unanswered questions suite case', () => {
  it('should get unanswered questions successfully', async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const form = await formFactory({
      trainer: trainer._id,
      type: FORM_TYPES.ONBOARDING,
    });
    await questionFactory({ form: form._id });
    const res = await testRequest<GetUnansweredQuestionsDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: UNANSWERED_QUESTIONS,
      token: client.token,
      params: { form: form._id.toString() as any },
    });
    expect(res.body.length).toBe(1);
  });

  it("shouldn't get a question when it's answered", async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const form = await formFactory({ trainer: trainer._id });
    const question = await questionFactory({ form: form._id });
    const followup = await followUpFactory({
      client: client._id,
      trainer: trainer._id,
    });
    const answer = await answerFactory({
      question: question._id,
      client: client._id,
      followUp: followup._id,
    });
    const res = await testRequest<GetUnansweredQuestionsDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: UNANSWERED_QUESTIONS,
      token: client.token,
      params: {
        form: form._id.toString() as any,
        followUp: answer.followUp.toString() as any,
      },
    });
    expect(res.body.length).toBe(0);
  });

  it("shouldn't get a question when it's follow up form without followUp", async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const form = await formFactory({
      trainer: trainer._id,
      type: FORM_TYPES.FOLLOW_UP,
    });
    const res = await testRequest<GetUnansweredQuestionsDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: UNANSWERED_QUESTIONS,
      token: client.token,
      params: {
        form: form._id.toString() as any,
      },
    });
    expect(res.body.message).toContain('follow up form has to have follow up');
  });
});
