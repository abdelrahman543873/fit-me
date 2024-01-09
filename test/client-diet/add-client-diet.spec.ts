import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { USER_ROLE } from '../../src/user/user.constants';
import { userFactory } from '../user/user.factory';
import { clientFactory } from '../client/client.factory';
import { faker } from '@faker-js/faker';
import { buildClientDietParams } from './client-diet.factory';
import { dietFactory } from '../diet/diet.factory';
import { AddClientDietDto } from '../../src/client-diet/inputs/add-client-diet.input';
import { CLIENT_DIET } from '../endpoints/client-diet.endpoints';

describe('add client diet suite case', () => {
  it('should add client diet successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const diet = await dietFactory({ trainer: trainer._id });
    const client = await clientFactory();
    const params = await buildClientDietParams({
      diet: diet._id,
      client: client._id,
    });
    const res = await testRequest<AddClientDietDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: CLIENT_DIET,
      token: trainer.token,
      variables: {
        client: params.client,
        endDate: params.endDate,
        followUpDates: [params.endDate],
        diet: params.diet,
        startDate: params.startDate,
      },
    });
    expect(res.body.client).toBe(client._id.toString());
    expect(res.body.diet).toBe(diet._id.toString());
  });

  it('should fail if start date bigger than end date', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const diet = await dietFactory({ trainer: trainer._id });
    const client = await clientFactory();
    const params = await buildClientDietParams({
      diet: diet._id,
      client: client._id,
    });
    const res = await testRequest<AddClientDietDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: CLIENT_DIET,
      token: trainer.token,
      variables: {
        client: params.client,
        endDate: faker.date.past(),
        followUpDates: [params.endDate],
        diet: params.diet,
        startDate: faker.date.past(),
      },
    });
    expect(res.body.message[0]).toContain(
      'end date must be bigger than start date',
    );
  });

  it('should fail if a follow up date is out of range', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const diet = await dietFactory({ trainer: trainer._id });
    const client = await clientFactory();
    const params = await buildClientDietParams({
      diet: diet._id,
      client: client._id,
    });
    const outOfRangeDate = faker.date.future({ refDate: params.endDate });

    const res = await testRequest<AddClientDietDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: CLIENT_DIET,
      token: trainer.token,
      variables: {
        client: params.client,
        endDate: params.endDate,
        followUpDates: [params.endDate, outOfRangeDate],
        diet: params.diet,
        startDate: params.startDate,
      },
    });
    expect(res.body.message).toContain(
      'follow up date must be within start and end date',
    );
  });
});
