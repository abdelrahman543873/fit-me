import { formFactory } from './../form/form.factory';
import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { USER_ROLE } from '../../src/user/user.constants';
import { userFactory } from '../user/user.factory';
import { questionFactory } from './question.factory';
import { UNANSWERED_QUESTIONS } from '../endpoints/question.endpoints';
import { GetUnansweredQuestionsDto } from '../../src/question/inputs/get-unanswered-questions.dto';
import { answerFactory } from '../answer/answer.factory';

describe('get unanswered questions suite case', () => {
  it('should get unanswered questions successfully', async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const form = await formFactory({ trainer: trainer._id });
    await questionFactory({ form: form._id });
    const res = await testRequest<GetUnansweredQuestionsDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: `${UNANSWERED_QUESTIONS}/${form._id.toString()}`,
      token: client.token,
    });
    expect(res.body.length).toBe(1);
  });

  it("shouldn't get a question when it's answered", async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const form = await formFactory({ trainer: trainer._id });
    const question = await questionFactory({ form: form._id });
    await answerFactory({ question: question._id, client: client._id });
    const res = await testRequest<GetUnansweredQuestionsDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: `${UNANSWERED_QUESTIONS}/${form._id.toString()}`,
      token: client.token,
    });
    expect(res.body.length).toBe(0);
  });
});