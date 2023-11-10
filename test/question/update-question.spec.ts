import { formFactory } from './../form/form.factory';
import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { USER_ROLE } from '../../src/user/user.constants';
import { userFactory } from '../user/user.factory';
import { buildQuestionParams, questionFactory } from './question.factory';
import { QUESTION } from '../endpoints/question.endpoints';
import { UpdateQuestionDto } from '../../src/question/inputs/update-question.dto';

describe('question suite case', () => {
  it('should update question successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const form = await formFactory({ trainer: trainer._id });
    const question = await questionFactory({ form: form._id });
    const questionParams = await buildQuestionParams();
    const res = await testRequest<UpdateQuestionDto>({
      method: HTTP_METHODS_ENUM.PUT,
      url: QUESTION,
      token: trainer.token,
      variables: {
        ...questionParams,
        id: question._id,
        form: question.form,
      },
    });
    expect(res.body.type).toBe(questionParams.type);
    expect(res.body.title).toBe(questionParams.title);
  });

  it("should throw error if user isn't form owner", async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const question = await questionFactory();
    const questionParams = await buildQuestionParams();
    const res = await testRequest<UpdateQuestionDto>({
      method: HTTP_METHODS_ENUM.PUT,
      url: QUESTION,
      token: trainer.token,
      variables: {
        ...questionParams,
        id: question._id,
      },
    });
    expect(res.body.message).toContain('unauthorized form');
  });
});
