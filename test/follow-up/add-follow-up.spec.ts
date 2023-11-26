import { clientFactory } from './../client/client.factory';
import { FOLLOW_UP_STATUS } from './../../src/follow-up/follow-up.constants';
import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { USER_ROLE } from '../../src/user/user.constants';
import { userFactory } from '../user/user.factory';
import { buildFollowUpParams } from './follow-up.factory';
import { AddFollowUpDto } from '../../src/follow-up/inputs/add-follow-up.dto';
import { FOLLOW_UP } from '../endpoints/follow-up.endpoints';
import { formFactory } from '../form/form.factory';
import { clientProgramFactory } from '../client-program/client-program.factory';
import { ClientProgramRepo } from '../client-program/client-program.test-repo';

describe('follow up suite case', () => {
  it('should add follow up successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const form = await formFactory({ trainer: trainer._id });
    const params = await buildFollowUpParams({
      trainer: trainer._id,
      form: form._id,
    });
    delete params.trainer;
    delete params.status;
    const res = await testRequest<AddFollowUpDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: FOLLOW_UP,
      token: trainer.token,
      variables: params,
    });
    expect(res.body.client).toBe(params.client.toString());
    expect(res.body.measurementTypes[0]).toBe(params.measurementTypes[0]);
    expect(res.body.status).toBe(FOLLOW_UP_STATUS.REQUESTED);
  });

  it('should update only last client program with last follow up date', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const client = await clientFactory();
    const form = await formFactory({ trainer: trainer._id });
    const clientProgram = await clientProgramFactory({ client: client._id });
    const moreRecentClientProgram = await clientProgramFactory({
      client: client._id,
    });
    const params = await buildFollowUpParams({
      trainer: trainer._id,
      form: form._id,
      client: client._id,
    });
    delete params.trainer;
    delete params.status;
    await testRequest<AddFollowUpDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: FOLLOW_UP,
      token: trainer.token,
      variables: params,
    });
    const clientProgramAfterUpdate = await ClientProgramRepo().findOne({
      _id: clientProgram._id,
    });
    expect(clientProgramAfterUpdate.lastFollowUpDate.toISOString()).toBe(
      clientProgram.lastFollowUpDate.toISOString(),
    );
    const moreRecentClientProgramAfterUpdate =
      await ClientProgramRepo().findOne({
        _id: moreRecentClientProgram._id,
      });
    expect(
      moreRecentClientProgramAfterUpdate.lastFollowUpDate.toISOString(),
    ).not.toBe(moreRecentClientProgram.lastFollowUpDate.toISOString());
  });

  it('should fail if request maker is a client', async () => {
    const trainer = await userFactory({ role: USER_ROLE.CLIENT });
    const res = await testRequest<AddFollowUpDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: FOLLOW_UP,
      token: trainer.token,
    });
    expect(res.body.statusCode).toBe(604);
    expect(res.body.message).toBe('insufficient role');
  });
});
