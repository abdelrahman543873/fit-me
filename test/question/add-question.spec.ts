import { formFactory } from './../form/form.factory';
import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { USER_ROLE } from '../../src/user/user.constants';
import { userFactory } from '../user/user.factory';
import { buildQuestionParams } from './question.factory';
import { AddQuestionDto } from '../../src/question/inputs/add-question.dto';
import { QUESTION } from '../endpoints/question.endpoints';

describe('question suite case', () => {
  it('should add question successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const form = await formFactory({ trainerId: trainer._id });
    const question = await buildQuestionParams({ formId: form._id });
    const res = await testRequest<AddQuestionDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: QUESTION,
      token: trainer.token,
      variables: {
        ...question,
      },
    });
    expect(res.body.type).toBe(question.type);
    expect(res.body.title).toBe(question.title);
  });

  it("should throw error if user isn't form owner", async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const question = await buildQuestionParams();
    const res = await testRequest<AddQuestionDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: QUESTION,
      token: trainer.token,
      variables: {
        ...question,
      },
    });
    expect(res.body.message).toContain('unauthorized form');
  });
});
