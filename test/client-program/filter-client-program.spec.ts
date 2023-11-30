import { clientFactory } from './../client/client.factory';
import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { clientProgramFactory } from './client-program.factory';
import { FILTER_CLIENT_PROGRAMS } from '../endpoints/client-program.endpoints';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { programFactory } from '../program/program.factory';
import { subscriptionFactory } from '../subscription/subscription.factory';
import { FilterClientProgramDto } from '../../src/client-program/inputs/filter-client-program.dto';
import { faker } from '@faker-js/faker/locale/af_ZA';
import { CLIENT_PROGRAM_STATUS_FIlTER } from '../../src/client-program/client-program.constants';

describe('get client program suite case', () => {
  it('should get client program successfully', async () => {
    const clientUser = await userFactory({ role: USER_ROLE.CLIENT });
    const client = await clientFactory({ _id: clientUser._id });
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const program = await programFactory({ trainer: trainer._id });
    await subscriptionFactory({ client: client._id, trainer: trainer._id });
    await clientProgramFactory({
      client: client._id,
      program: program._id,
    });
    const res = await testRequest<FilterClientProgramDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: FILTER_CLIENT_PROGRAMS,
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
    const program = await programFactory({ trainer: trainer._id });
    await subscriptionFactory({ client: client._id, trainer: trainer._id });
    const randomFutureDate = faker.date.future();
    const futureFollowUpClientProgram = await clientProgramFactory({
      client: client._id,
      program: program._id,
      followUpDates: [randomFutureDate, faker.date.past()],
      lastFollowUpDate: faker.date.recent(),
    });
    // past followup client program
    await clientProgramFactory({
      client: client._id,
      program: program._id,
      followUpDates: [faker.date.past()],
      lastFollowUpDate: faker.date.recent(),
    });
    const res = await testRequest<FilterClientProgramDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: FILTER_CLIENT_PROGRAMS,
      token: clientUser.token,
      params: {
        client: client._id,
        status: CLIENT_PROGRAM_STATUS_FIlTER.FUTURE,
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
    const program = await programFactory({ trainer: trainer._id });
    await subscriptionFactory({ client: client._id, trainer: trainer._id });
    await clientProgramFactory({
      client: client._id,
      program: program._id,
      followUpDates: [faker.date.future()],
      lastFollowUpDate: faker.date.recent(),
    });
    const pastFollowUpClientProgram = await clientProgramFactory({
      client: client._id,
      program: program._id,
      followUpDates: [faker.date.past()],
      lastFollowUpDate: faker.date.recent(),
    });
    const res = await testRequest<FilterClientProgramDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: FILTER_CLIENT_PROGRAMS,
      token: clientUser.token,
      params: {
        client: client._id,
        status: CLIENT_PROGRAM_STATUS_FIlTER.PAST,
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
    const program = await programFactory({ trainer: trainer._id });
    await subscriptionFactory({ client: client._id, trainer: trainer._id });
    await clientProgramFactory({
      client: client._id,
      program: program._id,
      followUpDates: [faker.date.future()],
      lastFollowUpDate: faker.date.recent(),
    });
    const recentDate = new Date();
    recentDate.setHours(0, 0, 0, 0);
    const presentFollowUpClientProgram = await clientProgramFactory({
      client: client._id,
      program: program._id,
      followUpDates: [faker.date.past(), recentDate],
      lastFollowUpDate: faker.date.past(),
    });
    const res = await testRequest<FilterClientProgramDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: FILTER_CLIENT_PROGRAMS,
      token: clientUser.token,
      params: {
        client: client._id,
        status: CLIENT_PROGRAM_STATUS_FIlTER.PRESENT,
      },
    });
    expect(res.body.docs[0].client._id).toBe(client._id.toString());
    expect(res.body.docs[0]._id).toBe(
      presentFollowUpClientProgram._id.toString(),
    );
    expect(res.body.docs[0].dueDate).toBe(res.body.docs[0].lastFollowUpDate);
    expect(res.body.totalDocs).toBe(1);
  });
});
