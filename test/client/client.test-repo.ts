import { ClientRepository } from '../../src/client/client.repository';

export const ClientRepo = (): ClientRepository => global.clientRepository;
