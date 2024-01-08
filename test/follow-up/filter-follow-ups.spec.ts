import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { USER_ROLE } from '../../src/user/user.constants';
import { userFactory } from '../user/user.factory';
import { buildFollowUpParams, followUpFactory } from './follow-up.factory';
import { FILTER_FOLLOW_UP, FOLLOW_UP } from '../endpoints/follow-up.endpoints';
import { formFactory } from '../form/form.factory';
import { FilterFollowUpsDto } from '../../src/follow-up/inputs/filter-follow-ups.dto';
import { FORM_TYPES } from '../../src/form/form.constants';
import { questionFactory } from '../question/question.factory';
import {
  FOLLOW_UP_STATUS,
  FOLLOW_UP_TYPE,
} from '../../src/follow-up/follow-up.constants';
import { AddFollowUpDto } from '../../src/follow-up/inputs/add-follow-up.dto';
import { clientFactory } from '../client/client.factory';
import { subscriptionFactory } from '../subscription/subscription.factory';

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
    expect(res.body.docs[0].form._id).toBe(followUp.form.toString());
    expect(res.body.docs[0].measurementTypes[0]).toBe(
      followUp.measurementTypes[0],
    );
    expect(res.body.docs[0].client._id).toBe(followUp.client.toString());
  });

  it('should add workout follow up and filter successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const user = await userFactory({ role: USER_ROLE.CLIENT });
    const client = await clientFactory({ _id: user._id });
    await subscriptionFactory({ client: client._id, trainer: trainer._id });
    const form = await formFactory({
      trainer: trainer._id,
      type: FORM_TYPES.FOLLOW_UP,
    });
    await questionFactory({ form: form._id });
    const params = await buildFollowUpParams({
      trainer: trainer._id,
      form: form._id,
      type: FOLLOW_UP_TYPE.WORKOUT_PROGRAM,
      client: client._id,
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
    const filterFollowUpRes = await testRequest<FilterFollowUpsDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: FILTER_FOLLOW_UP,
      token: user.token,
      params: {
        status: FOLLOW_UP_STATUS.REQUESTED,
        type: FOLLOW_UP_TYPE.WORKOUT_PROGRAM,
      },
    });
    expect(filterFollowUpRes.body.docs[0].client._id).toBe(
      client._id.toString(),
    );
  });
});
