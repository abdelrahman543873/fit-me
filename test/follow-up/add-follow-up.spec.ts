import { FOLLOW_UP_STATUS } from './../../src/follow-up/follow-up.constants';
import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { USER_ROLE } from '../../src/user/user.constants';
import { userFactory } from '../user/user.factory';
import { buildFollowUpParams } from './follow-up.factory';
import { AddFollowUpDto } from '../../src/follow-up/inputs/add-follow-up.dto';
import { FOLLOW_UP } from '../endpoints/follow-up.endpoints';
import { formFactory } from '../form/form.factory';

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
    expect(res.body.measurementType).toBe(params.measurementType);
    expect(res.body.status).toBe(FOLLOW_UP_STATUS.REQUESTED);
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
