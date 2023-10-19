import { Injectable } from '@nestjs/common';
import { TrainerRepository } from './trainer.repository';
import { TrainerRegisteredEvent } from '../user/events/trainer-registered.event';
import { VerifyTrainerDto } from './inputs/verify-trainer.dto';

@Injectable()
export class TrainerService {
  constructor(private readonly trainerRepository: TrainerRepository) {}

  registerTrainer(trainerRegisteredEvent: TrainerRegisteredEvent) {
    return this.trainerRepository.registerTrainer(trainerRegisteredEvent);
  }

  verifyTrainer(verifyTrainerDto: VerifyTrainerDto) {
    return this.trainerRepository.verifyTrainer(verifyTrainerDto);
  }
}
