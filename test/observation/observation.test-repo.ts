import { ObservationRepository } from '../../src/observation/observation.repository';

export const ObservationRepo = (): ObservationRepository =>
  global.observationRepository;
