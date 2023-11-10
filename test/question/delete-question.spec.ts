import { formFactory } from '../form/form.factory';
import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { USER_ROLE } from '../../src/user/user.constants';
import { userFactory } from '../user/user.factory';
import { questionFactory } from './question.factory';
import { QUESTION } from '../endpoints/question.endpoints';
import { UpdateQuestionDto } from '../../src/question/inputs/update-question.dto';

describe('question suite case', () => {
  it('should delete question successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const form = await formFactory({ trainer: trainer._id });
    const question = await questionFactory({ form: form._id });
    const res = await testRequest<UpdateQuestionDto>({
      method: HTTP_METHODS_ENUM.DELETE,
      url: QUESTION,
      token: trainer.token,
      variables: {
        id: question._id,
      },
    });
    expect(res.body.deletedCount).toBe(1);
  });

  it("should throw error if user isn't form owner", async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const question = await questionFactory();
    const res = await testRequest<UpdateQuestionDto>({
      method: HTTP_METHODS_ENUM.DELETE,
      url: QUESTION,
      token: trainer.token,
      variables: {
        id: question._id,
      },
    });
    expect(res.body.message).toContain('unauthorized question');
  });
});
