import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { buildMeasurementParams } from './measurement.factory';
import { AddMeasurementDto } from '../../src/measurement/inputs/add-measurement.dto';
import { MEASUREMENT } from '../endpoints/measurement.endpoints';
import {
  MEASUREMENT_CATEGORY_UNITS,
  MEASUREMENT_TYPE,
} from '../../src/measurement/measurement.constants';
import { faker } from '@faker-js/faker';

describe('add measurement suite case', () => {
  it('should add measurement successfully', async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const measurement = await buildMeasurementParams({ client: client._id });
    delete measurement.client;
    const res = await testRequest<AddMeasurementDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: MEASUREMENT,
      variables: measurement,
      token: client.token,
    });
    expect(res.body.value).toBe(measurement.value);
    expect(res.body.type).toBe(measurement.type);
  });

  it('should add percentage measurement successfully', async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const measurement = await buildMeasurementParams({
      client: client._id,
      type: MEASUREMENT_TYPE.FAT_PERCENTAGE,
    });
    delete measurement.client;
    const res = await testRequest<AddMeasurementDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: MEASUREMENT,
      variables: measurement,
      token: client.token,
    });
    expect(res.body.value).toBe(measurement.value);
    expect(res.body.type).toBe(measurement.type);
  });

  it('should add media measurement successfully', async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const measurement = await buildMeasurementParams({
      client: client._id,
      type: MEASUREMENT_TYPE.BACK_IMAGE,
    });
    delete measurement.client;
    delete measurement.measuredAt;
    delete measurement.media;
    const res = await testRequest<AddMeasurementDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: MEASUREMENT,
      variables: measurement,
      token: client.token,
      fileParam: 'media',
    });
    expect(res.body.value).toBe(measurement.value);
    expect(res.body.type).toBe(measurement.type);
  });

  it("shouldn't add measurement if user isn't a client", async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const measurement = await buildMeasurementParams({ client: trainer._id });
    delete measurement.client;
    const res = await testRequest<AddMeasurementDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: MEASUREMENT,
      variables: measurement,
      token: trainer.token,
    });
    expect(res.body.statusCode).toBe(604);
  });

  it("shouldn't add measurement if unit isn't correct", async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const measurement = await buildMeasurementParams({
      client: client._id,
      type: MEASUREMENT_TYPE.BODY_WEIGHT,
      unit: MEASUREMENT_CATEGORY_UNITS.LENGTH[0],
    });
    delete measurement.client;
    const res = await testRequest<AddMeasurementDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: MEASUREMENT,
      variables: measurement,
      token: client.token,
    });
    expect(res.body.statusCode).toBe(400);
    expect(res.body.message).toContain('invalid measurement unit');
  });

  it("shouldn't add measurement if image measurement doesn't have image", async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const measurement = await buildMeasurementParams({
      client: client._id,
      type: MEASUREMENT_TYPE.BACK_IMAGE,
    });
    delete measurement.client;
    delete measurement.media;
    const res = await testRequest<AddMeasurementDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: MEASUREMENT,
      variables: measurement,
      token: client.token,
    });
    expect(res.body.statusCode).toBe(400);
    expect(res.body.message).toContain('image measurement must have an image');
  });

  it("shouldn't add measurement if image measurement has a value", async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const measurement = await buildMeasurementParams({
      client: client._id,
      type: MEASUREMENT_TYPE.BACK_IMAGE,
    });
    delete measurement.client;
    measurement.value = faker.number.int();
    const res = await testRequest<AddMeasurementDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: MEASUREMENT,
      variables: measurement,
      token: client.token,
    });
    expect(res.body.statusCode).toBe(400);
    expect(res.body.message).toContain('incorrect measurement value');
  });

  it("shouldn't add measurement if unit measurement doesn't have a value", async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const measurement = await buildMeasurementParams({
      client: client._id,
      type: MEASUREMENT_TYPE.BODY_WEIGHT,
      unit: MEASUREMENT_CATEGORY_UNITS.WEIGHT[0],
    });
    delete measurement.client;
    delete measurement.value;
    const res = await testRequest<AddMeasurementDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: MEASUREMENT,
      variables: measurement,
      token: client.token,
    });
    expect(res.body.statusCode).toBe(400);
    expect(res.body.message).toContain('incorrect measurement value');
  });

  it("shouldn't add measurement if image measurement has a unit", async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const measurement = await buildMeasurementParams({
      client: client._id,
      type: MEASUREMENT_TYPE.BODY_WEIGHT,
      unit: MEASUREMENT_CATEGORY_UNITS.WEIGHT[0],
    });
    delete measurement.client;
    measurement.media = faker.internet.url();
    const res = await testRequest<AddMeasurementDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: MEASUREMENT,
      variables: measurement,
      token: client.token,
    });
    expect(res.body.statusCode).toBe(400);
    expect(res.body.message).toContain("unit measurements can't have an media");
  });
});
