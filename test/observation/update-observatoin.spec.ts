import { clientFactory } from './../client/client.factory';
import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import {
  buildObservationParams,
  observationFactory,
} from './observation.factory';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { OBSERVATION } from '../endpoints/observation.endpoints';
import { subscriptionFactory } from '../subscription/subscription.factory';
import { UpdateObservationDto } from '../../src/observation/inputs/update-observation.input';

describe('update observation suite case', () => {
  it('should update observation', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const params = await buildObservationParams();
    await subscriptionFactory({ client: params.client, trainer: trainer._id });
    await clientFactory({ _id: params.client });
    const observation = await observationFactory({ trainer: trainer._id });
    delete params.trainer;
    const res = await testRequest<UpdateObservationDto>({
      method: HTTP_METHODS_ENUM.PUT,
      url: `${OBSERVATION}/${observation._id.toString()}`,
      variables: params,
      token: trainer.token,
    });
    expect(res.body.note).toBe(params.note);
  });
});
