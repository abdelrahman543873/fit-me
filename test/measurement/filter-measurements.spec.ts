import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { measurementsFactory } from './measurement.factory';
import { FILTER_MEASUREMENTS } from '../endpoints/measurement.endpoints';
import { FilterMeasurementsDto } from '../../src/measurement/inputs/filter-measurements.dto';

describe('filter measurements suite case', () => {
  it('should filter measurements successfully', async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const measurements = await measurementsFactory(10, { client: client._id });
    const res = await testRequest<FilterMeasurementsDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: FILTER_MEASUREMENTS,
      token: client.token,
    });
    expect(res.body[0].measurements[0].client).toBe(
      measurements[0].client.toString(),
    );
  });

  it('should filter measurements with type', async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const measurements = await measurementsFactory(10, { client: client._id });
    const res = await testRequest<FilterMeasurementsDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: `${FILTER_MEASUREMENTS}?type=${measurements[0].type}`,
      token: client.token,
    });
    expect(res.body[0].type).toBe(measurements[0].type);
  });
});
