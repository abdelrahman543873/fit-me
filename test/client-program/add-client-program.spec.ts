import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { USER_ROLE } from '../../src/user/user.constants';
import { userFactory } from '../user/user.factory';
import { buildClientProgramParams } from './client-program.factory';
import { CLIENT_PROGRAM } from '../endpoints/client-program.endpoints';
import { AddClientProgramDto } from '../../src/client-program/inputs/add-client-program.dto';
import { programFactory } from '../program/program.factory';
import { clientFactory } from '../client/client.factory';
import { faker } from '@faker-js/faker';

describe('add client program suite case', () => {
  it('should add client program successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const program = await programFactory({ trainer: trainer._id });
    const client = await clientFactory();
    const params = await buildClientProgramParams({
      program: program._id,
      client: client._id,
    });
    const res = await testRequest<AddClientProgramDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: CLIENT_PROGRAM,
      token: trainer.token,
      variables: {
        client: params.client,
        endDate: params.endDate,
        followUpDates: [params.endDate],
        program: params.program,
        startDate: params.startDate,
      },
    });
    expect(res.body.client).toBe(client._id.toString());
    expect(res.body.program).toBe(program._id.toString());
  });

  it('should fail if a follow up date is out of range', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const program = await programFactory({ trainer: trainer._id });
    const client = await clientFactory();
    const params = await buildClientProgramParams({
      program: program._id,
      client: client._id,
    });
    const outOfRangeDate = faker.date.future({ refDate: params.endDate });

    const res = await testRequest<AddClientProgramDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: CLIENT_PROGRAM,
      token: trainer.token,
      variables: {
        client: params.client,
        endDate: params.endDate,
        followUpDates: [params.endDate, outOfRangeDate],
        program: params.program,
        startDate: params.startDate,
      },
    });
    expect(res.body.message).toContain(
      'follow up date must be within start and end date',
    );
  });
});
