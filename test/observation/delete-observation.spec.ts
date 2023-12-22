import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { AddObservationDto } from '../../src/observation/inputs/add-observation.input';
import { OBSERVATION } from '../endpoints/observation.endpoints';
import { observationFactory } from './observation.factory';

describe('delete observation suite case', () => {
  it('should delete observation', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const observation = await observationFactory({ trainer: trainer._id });
    const res = await testRequest<AddObservationDto>({
      method: HTTP_METHODS_ENUM.DELETE,
      url: `${OBSERVATION}/${observation._id}`,
      token: trainer.token,
    });
    expect(res.body.type).toBe(observation.type);
  });
});
