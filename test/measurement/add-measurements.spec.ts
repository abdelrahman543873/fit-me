import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { buildMeasurementParams } from './measurement.factory';
import { MEASUREMENT_BULK } from '../endpoints/measurement.endpoints';
import { AddMeasurementsDto } from '../../src/measurement/inputs/add-measurements.dto';

describe('add measurements suite case', () => {
  it('should add measurements successfully', async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const measurement = await buildMeasurementParams();
    delete measurement.client;
    const res = await testRequest<AddMeasurementsDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: MEASUREMENT_BULK,
      variables: { measurements: [measurement] },
      token: client.token,
    });
    expect(res.body[0].type).toBe(measurement.type);
    expect(res.body[0].client).toBe(client._id.toString());
  });
});
