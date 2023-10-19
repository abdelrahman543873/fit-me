import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserEvents } from '../user/user.constants';
import { TrainerService } from './trainer.service';
import { TrainerRegisteredEvent } from '../user/events/trainer-registered.event';

@Injectable()
export class TrainerListener {
  constructor(private readonly trainerService: TrainerService) {}

  @OnEvent(UserEvents.TRAINER_REGISTRATION)
  async handleClientRegisteredEvent(
    trainerRegisteredEvent: TrainerRegisteredEvent,
  ) {
    return await this.trainerService.registerTrainer(trainerRegisteredEvent);
  }
}
