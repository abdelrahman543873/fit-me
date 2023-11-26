import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { USER_ROLE } from '../../src/user/user.constants';
import { userFactory } from '../user/user.factory';
import { followUpFactory } from './follow-up.factory';
import { formFactory } from '../form/form.factory';
import { FOLLOW_UP_STATUS } from '../../src/follow-up/follow-up.constants';
import { UpdateFollowUpDto } from '../../src/follow-up/inputs/update-follow-up.dto';
import { FOLLOW_UP } from '../endpoints/follow-up.endpoints';

describe('complete follow up suite case', () => {
  it('should complete follow up', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const form = await formFactory({ trainer: trainer._id });
    const followUp = await followUpFactory({
      trainer: trainer._id,
      form: form._id,
    });
    delete followUp.trainer;
    const res = await testRequest<UpdateFollowUpDto>({
      method: HTTP_METHODS_ENUM.PUT,
      url: `${FOLLOW_UP}/${followUp._id.toString()}`,
      variables: {
        status: FOLLOW_UP_STATUS.COMPLETED,
      },
      token: trainer.token,
    });
    expect(res.body.status).toBe(FOLLOW_UP_STATUS.COMPLETED);
  });
});
