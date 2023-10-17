import { TrainerRepository } from '../../src/trainer/trainer.repository';

export const TrainerRepo = (): TrainerRepository => global.trainerRepository;
