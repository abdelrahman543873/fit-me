import { MeasurementRepository } from '../../src/measurement/measurement.repository';

export const MeasurementRepo = (): MeasurementRepository =>
  global.measurementRepository;
