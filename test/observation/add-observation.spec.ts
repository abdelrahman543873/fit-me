import { clientFactory } from './../client/client.factory';
import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { buildObservationParams } from './observation.factory';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { AddObservationDto } from '../../src/observation/inputs/add-observation.input';
import { OBSERVATION } from '../endpoints/observation.endpoints';
import { subscriptionFactory } from '../subscription/subscription.factory';

describe('add observation suite case', () => {
  it('should add observation', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const params = await buildObservationParams();
    await subscriptionFactory({ client: params.client, trainer: trainer._id });
    await clientFactory({ _id: params.client });
    delete params.trainer;
    const res = await testRequest<AddObservationDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: OBSERVATION,
      variables: params,
      token: trainer.token,
    });
    expect(res.body.note).toBe(params.note);
  });
});
