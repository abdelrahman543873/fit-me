import { clientFactory } from './../client/client.factory';
import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import {
  buildObservationParams,
  observationFactory,
} from './observation.factory';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { FILTER_OBSERVATION } from '../endpoints/observation.endpoints';
import { subscriptionFactory } from '../subscription/subscription.factory';
import { FilterObservationsDto } from '../../src/observation/inputs/filter-observations.input';

describe('filter observations suite case', () => {
  it('should filter observations', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const params = await buildObservationParams({ trainer: trainer._id });
    const observation = await observationFactory({ ...params });
    await subscriptionFactory({ client: params.client, trainer: trainer._id });
    await clientFactory({ _id: params.client });
    delete params.trainer;
    const res = await testRequest<FilterObservationsDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: FILTER_OBSERVATION,
      params: params,
      token: trainer.token,
    });
    expect(res.body[0]._id).toBe(observation._id.toString());
  });
});
