import { clientFactory } from './../client/client.factory';
import {
  FOLLOW_UP_STATUS,
  FOLLOW_UP_TYPE,
} from './../../src/follow-up/follow-up.constants';
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
import { FORM_TYPES } from '../../src/form/form.constants';
import { questionFactory } from '../question/question.factory';
import { waitForMilliSeconds } from '../utils/wait-for.util';
import { clientDietFactory } from '../client-diet/client-diet.factory';
import { ClientDietRepo } from '../client-diet/client-diet.test-repo';

describe('follow up suite case', () => {
  it('should add workout follow up successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const form = await formFactory({
      trainer: trainer._id,
      type: FORM_TYPES.FOLLOW_UP,
    });
    await questionFactory({ form: form._id });
    const params = await buildFollowUpParams({
      trainer: trainer._id,
      form: form._id,
      type: FOLLOW_UP_TYPE.WORKOUT_PROGRAM,
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

  it("should fail if form doesn't have questions", async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const form = await formFactory({
      trainer: trainer._id,
      type: FORM_TYPES.FOLLOW_UP,
    });
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
    expect(res.body.message).toContain("form doesn't have questions");
  });

  it('should update only last client workout program with last follow up date', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const client = await clientFactory();
    const form = await formFactory({
      trainer: trainer._id,
      type: FORM_TYPES.FOLLOW_UP,
    });
    await questionFactory({ form: form._id });
    const clientProgram = await clientProgramFactory({ client: client._id });
    const moreRecentClientProgram = await clientProgramFactory({
      client: client._id,
    });
    const params = await buildFollowUpParams({
      trainer: trainer._id,
      form: form._id,
      client: client._id,
      type: FOLLOW_UP_TYPE.WORKOUT_PROGRAM,
    });
    delete params.trainer;
    delete params.status;
    await testRequest<AddFollowUpDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: FOLLOW_UP,
      token: trainer.token,
      variables: params,
    });
    await waitForMilliSeconds(100);
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

  it('should update only last client diet program with last follow up date', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const client = await clientFactory();
    const form = await formFactory({
      trainer: trainer._id,
      type: FORM_TYPES.FOLLOW_UP,
    });
    await questionFactory({ form: form._id });
    const clientDiet = await clientDietFactory({ client: client._id });
    const moreRecentClientDiet = await clientDietFactory({
      client: client._id,
    });
    const params = await buildFollowUpParams({
      trainer: trainer._id,
      form: form._id,
      client: client._id,
      type: FOLLOW_UP_TYPE.DIET_PROGRAM,
    });
    delete params.trainer;
    delete params.status;
    await testRequest<AddFollowUpDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: FOLLOW_UP,
      token: trainer.token,
      variables: params,
    });
    await waitForMilliSeconds(100);
    const clientDietAfterUpdate = await ClientDietRepo().findOne({
      _id: clientDiet._id,
    });
    expect(clientDietAfterUpdate.lastFollowUpDate.toISOString()).toBe(
      clientDiet.lastFollowUpDate.toISOString(),
    );
    const moreRecentClientProgramAfterUpdate = await ClientDietRepo().findOne({
      _id: moreRecentClientDiet._id,
    });
    expect(
      moreRecentClientProgramAfterUpdate.lastFollowUpDate.toISOString(),
    ).not.toBe(moreRecentClientDiet.lastFollowUpDate.toISOString());
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
