import { ClientProgramRepository } from '../../src/client-program/client-program.repository';

export const ClientProgramRepo = (): ClientProgramRepository =>
  global.clientProgramRepository;
