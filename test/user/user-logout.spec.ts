import { userFactory } from './user.factory';
import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { USER_LOGOUT } from '../endpoints/user.endpoints';
import { UserLoginDto } from '../../src/user/inputs/user-login.dto';

describe('logout suite case', () => {
  it('should logout successfully', async () => {
    const user = await userFactory();
    const res = await testRequest<UserLoginDto>({
      method: HTTP_METHODS_ENUM.PUT,
      url: USER_LOGOUT,
      token: user.token,
    });
    expect(res.body.fcmToken).toBe(null);
  });
});
