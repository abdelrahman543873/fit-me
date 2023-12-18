import { ClientDietRepository } from '../../src/client-diet/client-diet.repository';

export const ClientDietRepo = (): ClientDietRepository =>
  global.clientDietRepository;
