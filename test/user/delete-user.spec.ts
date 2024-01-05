import { userFactory } from './user.factory';
import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { USER_DELETE } from '../endpoints/user.endpoints';
import { UserLoginDto } from '../../src/user/inputs/user-login.dto';
import { UserRepo } from './user.test-repo';

describe('delete user suite case', () => {
  it('should delete user successfully', async () => {
    const user = await userFactory();
    await testRequest<UserLoginDto>({
      method: HTTP_METHODS_ENUM.DELETE,
      url: USER_DELETE,
      token: user.token,
    });
    const userAfterDeletion = await UserRepo().findOne({ _id: user._id });
    expect(userAfterDeletion.email).not.toBe(user.email);
    expect(userAfterDeletion.phoneNumber).not.toBe(user.phoneNumber);
  });
});
