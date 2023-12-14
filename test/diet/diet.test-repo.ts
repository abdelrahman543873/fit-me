import { DietRepository } from '../../src/diet/diet.repository';

export const DietRepo = (): DietRepository => global.dietRepository;
