import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { Trainer, TrainerDocument } from './trainer.schema';
import { TrainerRegisteredEvent } from '../user/events/trainer-registered.event';

@Injectable()
export class TrainerRepository extends BaseRepository<Trainer> {
  constructor(
    @InjectModel(Trainer.name)
    private trainerSchema: Model<TrainerDocument>,
  ) {
    super(trainerSchema);
  }

  registerTrainer(trainerRegisteredEvent: TrainerRegisteredEvent) {
    return this.trainerSchema.create({
      _id: trainerRegisteredEvent.trainerId,
    });
  }
}
