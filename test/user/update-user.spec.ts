import { buildUserParams, userFactory } from './user.factory';
import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { USER } from '../endpoints/user.endpoints';
import { USER_ROLE } from '../../src/user/user.constants';
import { UpdateUserDto } from '../../src/user/inputs/user-update.dto';

describe('user update suite case', () => {
  it('should update client successfully', async () => {
    const user = await userFactory({ role: USER_ROLE.CLIENT });
    const updatedUser = await buildUserParams({ role: USER_ROLE.CLIENT });
    const testFiles = process.cwd();
    delete updatedUser.role;
    const filePath = `${testFiles}/test/test-files/test-duck.jpeg`;
    const res = await testRequest<UpdateUserDto>({
      method: HTTP_METHODS_ENUM.PUT,
      url: `${USER}/${user._id.toString()}`,
      variables: updatedUser,
      token: user.token,
      filePath,
      fileParam: 'profilePicture',
    });
    expect(res.body.firstName).toBe(updatedUser.firstName);
  });
});
