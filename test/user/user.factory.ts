import { faker } from '@faker-js/faker';
import { UserRepo } from './user.test-repo';
import type { User } from '../../src/user/user.schema';
import { generateAuthToken } from '../../src/shared/utils/token-utils';
import { USER_ROLE } from '../../src/user/user.constants';

export const buildUserParams = (obj: Partial<User> = {}): Partial<User> => {
  return {
    firstName: obj.firstName || faker.person.firstName(),
    lastName: obj.lastName || faker.person.lastName(),
    phoneNumber:
      obj.phoneNumber || faker.helpers.replaceSymbolWithNumber('0100#######'),
    password: obj.password || faker.internet.password(),
    email: obj.email || faker.internet.email(),
    profilePicture: obj.profilePicture || faker.internet.url(),
    role:
      obj.role ||
      (faker.helpers.arrayElement(Object.keys(USER_ROLE)) as USER_ROLE),
  };
};

export const userFactory = async (obj: Partial<User> = {}): Promise<User> => {
  const params: Partial<User> = buildUserParams(obj);
  const user = await UserRepo().add(params);
  const authenticatedUser = user.toJSON();
  authenticatedUser.token = generateAuthToken(user._id);
  return authenticatedUser;
};