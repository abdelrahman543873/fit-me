import { CLIENT_DIET_PROGRAM_STATUS_FIlTER } from './../../src/client-diet/client-diet.constants';
import { clientFactory } from './../client/client.factory';
import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { subscriptionFactory } from '../subscription/subscription.factory';
import { faker } from '@faker-js/faker/locale/af_ZA';
import { clientDietFactory } from './client-diet.factory';
import { dietFactory } from '../diet/diet.factory';
import { FILTER_CLIENT_DIETS } from '../endpoints/client-diet.endpoints';
import { FilterClientDietsDto } from '../../src/client-diet/inputs/filter-client-diets.input';

describe('get client diet suite case', () => {
  it('should get client diet successfully', async () => {
    const clientUser = await userFactory({ role: USER_ROLE.CLIENT });
    const client = await clientFactory({ _id: clientUser._id });
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const diet = await dietFactory({ trainer: trainer._id });
    await subscriptionFactory({ client: client._id, trainer: trainer._id });
    await clientDietFactory({
      client: client._id,
      diet: diet._id,
    });
    const res = await testRequest<FilterClientDietsDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: FILTER_CLIENT_DIETS,
      token: clientUser.token,
      params: { client: client._id },
    });
    expect(res.body.docs[0].client._id).toBe(client._id.toString());
    expect(res.body.docs[0]).not.toHaveProperty('dueDate');
  });

  it('should get future client program successfully', async () => {
    const clientUser = await userFactory({ role: USER_ROLE.CLIENT });
    const client = await clientFactory({ _id: clientUser._id });
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const diet = await dietFactory({ trainer: trainer._id });
    await subscriptionFactory({ client: client._id, trainer: trainer._id });
    const randomFutureDate = faker.date.future();
    const futureFollowUpClientProgram = await clientDietFactory({
      client: client._id,
      diet: diet._id,
      followUpDates: [randomFutureDate, faker.date.past()],
      lastFollowUpDate: faker.date.recent(),
    });
    // past followup client program
    await clientDietFactory({
      client: client._id,
      diet: diet._id,
      followUpDates: [faker.date.past()],
      lastFollowUpDate: faker.date.recent(),
    });
    const res = await testRequest<FilterClientDietsDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: FILTER_CLIENT_DIETS,
      token: clientUser.token,
      params: {
        client: client._id,
        status: CLIENT_DIET_PROGRAM_STATUS_FIlTER.FUTURE,
      },
    });
    expect(res.body.docs[0].client._id).toBe(client._id.toString());
    expect(res.body.docs[0]._id).toBe(
      futureFollowUpClientProgram._id.toString(),
    );
    expect(res.body.docs[0].dueDate).toBe(randomFutureDate.toISOString());
    expect(res.body.totalDocs).toBe(1);
  });
  it('should get past client program successfully', async () => {
    const clientUser = await userFactory({ role: USER_ROLE.CLIENT });
    const client = await clientFactory({ _id: clientUser._id });
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const diet = await dietFactory({ trainer: trainer._id });
    await subscriptionFactory({ client: client._id, trainer: trainer._id });
    await clientDietFactory({
      client: client._id,
      diet: diet._id,
      followUpDates: [faker.date.future()],
      lastFollowUpDate: faker.date.recent(),
    });
    const pastFollowUpClientProgram = await clientDietFactory({
      client: client._id,
      diet: diet._id,
      followUpDates: [faker.date.past()],
      lastFollowUpDate: faker.date.recent(),
    });
    const res = await testRequest<FilterClientDietsDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: FILTER_CLIENT_DIETS,
      token: clientUser.token,
      params: {
        client: client._id,
        status: CLIENT_DIET_PROGRAM_STATUS_FIlTER.PAST,
      },
    });
    expect(res.body.docs[0].client._id).toBe(client._id.toString());
    expect(res.body.docs[0]._id).toBe(pastFollowUpClientProgram._id.toString());
    expect(res.body.totalDocs).toBe(1);
  });
  it('should get present client program successfully', async () => {
    const clientUser = await userFactory({ role: USER_ROLE.CLIENT });
    const client = await clientFactory({ _id: clientUser._id });
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const diet = await dietFactory({ trainer: trainer._id });
    await subscriptionFactory({ client: client._id, trainer: trainer._id });
    await clientDietFactory({
      client: client._id,
      diet: diet._id,
      followUpDates: [faker.date.future()],
      lastFollowUpDate: faker.date.recent(),
    });
    const recentDate = new Date();
    recentDate.setHours(0, 0, 0, 0);
    const presentFollowUpClientProgram = await clientDietFactory({
      client: client._id,
      diet: diet._id,
      followUpDates: [faker.date.past(), recentDate],
      lastFollowUpDate: faker.date.past(),
    });
    const res = await testRequest<FilterClientDietsDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: FILTER_CLIENT_DIETS,
      token: clientUser.token,
      params: {
        client: client._id,
        status: CLIENT_DIET_PROGRAM_STATUS_FIlTER.PRESENT,
      },
    });
    expect(res.body.docs[0].client._id).toBe(client._id.toString());
    expect(res.body.docs[0]._id).toBe(
      presentFollowUpClientProgram._id.toString(),
    );
    expect(res.body.docs[0].dueDate).toBe(recentDate.toISOString());
    expect(res.body.totalDocs).toBe(1);
  });
});
