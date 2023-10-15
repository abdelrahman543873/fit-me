import { buildUserParams, userFactory } from './user.factory';
import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { REGISTER_USER } from '../endpoints/user.endpoints';
import { USER_ROLE } from '../../src/user/user.constants';
import { ClientRepo } from '../client/client.test-repo';
import { Types } from 'mongoose';
import { SubscriptionRepo } from '../subscription/subscription.test-repo';

describe('user register suite case', () => {
  it('should register client successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const client = await buildUserParams({ role: USER_ROLE.CLIENT });
    const testFiles = process.cwd();
    const filePath = `${testFiles}/test/test-files/test-duck.jpeg`;
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: REGISTER_USER,
      variables: { ...client, trainerId: trainer._id.toString() },
      filePath,
      fileParam: 'profilePicture',
    });
    expect(res.body.firstName).toBe(client.firstName);
    const createdClient = await ClientRepo().findOne({
      _id: new Types.ObjectId(res.body._id),
    });
    expect(createdClient).toBeTruthy();
    const subscription = await SubscriptionRepo().findOne({
      trainer: trainer._id,
    });
    expect(subscription).toBeTruthy();
  });

  it('should register trainer successfully', async () => {
    const trainer = await buildUserParams({ role: USER_ROLE.TRAINER });
    const testFiles = process.cwd();
    const filePath = `${testFiles}/test/test-files/test-duck.jpeg`;
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: REGISTER_USER,
      variables: trainer,
      filePath,
      fileParam: 'profilePicture',
    });
    expect(res.body.firstName).toBe(trainer.firstName);
  });
});
