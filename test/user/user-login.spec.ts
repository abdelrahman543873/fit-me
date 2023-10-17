import { buildUserParams, userFactory } from './user.factory';
import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { USER_LOGIN } from '../endpoints/user.endpoints';

describe('login suite case', () => {
  it('should login successfully', async () => {
    const params = await buildUserParams();
    await userFactory({ ...params });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: USER_LOGIN,
      variables: {
        phoneNumber: params.phoneNumber,
        password: params.password,
      },
    });
    expect(res.body.token).toBeTruthy();
  });
});
