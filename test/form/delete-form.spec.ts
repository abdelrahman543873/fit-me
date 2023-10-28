import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { formFactory } from './form.factory';
import { FORM } from '../endpoints/form.endpoints';
import { USER_ROLE } from '../../src/user/user.constants';
import { userFactory } from '../user/user.factory';
import { DeleteFormDto } from '../../src/form/inputs/delete-form.dto';

describe('form suite case', () => {
  it('should delete form successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const params = await formFactory({ trainer: trainer._id });
    const res = await testRequest<DeleteFormDto>({
      method: HTTP_METHODS_ENUM.DELETE,
      url: FORM,
      token: trainer.token,
      variables: { id: params._id },
    });
    expect(res.body.deletedCount).toBe(1);
  });
});
