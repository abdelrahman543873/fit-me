import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { buildFormParams } from './form.factory';
import { ADD_FORM } from '../endpoints/form.endpoints';
import { AddFormDto } from '../../src/form/inputs/add-form.dto';
import { USER_ROLE } from '../../src/user/user.constants';
import { userFactory } from '../user/user.factory';

describe('form suite case', () => {
  it('should add form successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const params = await buildFormParams();
    const res = await testRequest<AddFormDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: ADD_FORM,
      token: trainer.token,
      variables: { title: params.title, type: params.type },
    });
    expect(res.body.title).toBe(params.title);
    expect(res.body.type).toBe(params.type);
  });
});
