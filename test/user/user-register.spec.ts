import { buildUserParams, userFactory } from './user.factory';
import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { REGISTER_USER } from '../endpoints/user.endpoints';
import { USER_ROLE } from '../../src/user/user.constants';
import { ClientRepo } from '../client/client.test-repo';
import { Types } from 'mongoose';
import { SubscriptionRepo } from '../subscription/subscription.test-repo';
import { TrainerRepo } from '../trainer/trainer.test-repo';

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
    const createdTrainer = await TrainerRepo().findOne({
      _id: new Types.ObjectId(res.body._id),
    });
    expect(createdTrainer).toBeTruthy();
  });
  it('should forbid entering a non existing trainer', async () => {
    const randomMongoId = '507f191e810c19729de860ea';
    const trainer = await buildUserParams({ role: USER_ROLE.CLIENT });
    const testFiles = process.cwd();
    const filePath = `${testFiles}/test/test-files/test-duck.jpeg`;
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: REGISTER_USER,
      variables: { ...trainer, trainerId: randomMongoId },
      filePath,
      fileParam: 'profilePicture',
    });
    expect(res.body.statusCode).toBe(400);
  });

  it('should forbid entering an existing email', async () => {
    const userParams = await buildUserParams();
    await userFactory({ ...userParams, phoneNumber: null });
    const testFiles = process.cwd();
    const filePath = `${testFiles}/test/test-files/test-duck.jpeg`;
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: REGISTER_USER,
      variables: { ...userParams },
      filePath,
      fileParam: 'profilePicture',
    });
    expect(res.body.message[0]).toBe('this email already exists');
    expect(res.body.statusCode).toBe(400);
  });

  it('should forbid entering trainer id with trainer', async () => {
    const seededTrainer = await userFactory({ role: USER_ROLE.TRAINER });
    const trainer = await buildUserParams({ role: USER_ROLE.TRAINER });
    const testFiles = process.cwd();
    const filePath = `${testFiles}/test/test-files/test-duck.jpeg`;
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: REGISTER_USER,
      variables: { ...trainer, trainerId: seededTrainer._id.toString() },
      filePath,
      fileParam: 'profilePicture',
    });
    expect(res.body.statusCode).toBe(400);
  });
});
