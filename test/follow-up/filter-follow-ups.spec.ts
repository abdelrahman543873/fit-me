import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { USER_ROLE } from '../../src/user/user.constants';
import { userFactory } from '../user/user.factory';
import { followUpFactory } from './follow-up.factory';
import { FILTER_FOLLOW_UP } from '../endpoints/follow-up.endpoints';
import { formFactory } from '../form/form.factory';
import { FilterFollowUpsDto } from '../../src/follow-up/inputs/filter-follow-ups.dto';

describe('filter follow ups suite case', () => {
  it('should filter follow ups successfully as a trainer', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const form = await formFactory({ trainer: trainer._id });
    const followUp = await followUpFactory({
      trainer: trainer._id,
      form: form._id,
    });
    delete followUp.trainer;
    const res = await testRequest<FilterFollowUpsDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: FILTER_FOLLOW_UP,
      token: trainer.token,
      params: {
        status: followUp.status,
        client: followUp.client.toString() as any,
        measurementTypes: followUp.measurementTypes,
        form: followUp.form.toString() as any,
      },
    });
    expect(res.body.docs[0].form).toBe(followUp.form.toString());
    expect(res.body.docs[0].measurementTypes[0]).toBe(
      followUp.measurementTypes[0],
    );
    expect(res.body.docs[0].client._id).toBe(followUp.client.toString());
  });
});
