import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { formFactory } from './form.factory';
import { FORM } from '../endpoints/form.endpoints';
import { USER_ROLE } from '../../src/user/user.constants';
import { userFactory } from '../user/user.factory';
import { DeleteFormDto } from '../../src/form/inputs/delete-form.dto';
import { questionFactory } from '../question/question.factory';
import { QuestionRepo } from '../question/question.test-repo';

describe('form suite case', () => {
  it("should delete form successfully with all it's questions", async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const form = await formFactory({ trainer: trainer._id });
    await questionFactory({ form: form._id });
    const questionCount = await QuestionRepo().count({ form: form._id });
    expect(questionCount).toBe(1);
    const res = await testRequest<DeleteFormDto>({
      method: HTTP_METHODS_ENUM.DELETE,
      url: FORM,
      token: trainer.token,
      variables: { id: form._id },
    });
    expect(res.body.deletedCount).toBe(1);
    const questionCountAfterDeletion = await QuestionRepo().count({
      form: form._id,
    });
    expect(questionCountAfterDeletion).toBe(0);
  });
});
