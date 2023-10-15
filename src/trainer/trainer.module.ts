import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Trainer, TrainerSchema } from './trainer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Trainer.name, schema: TrainerSchema }]),
  ],
})
export class TrainerModule {}
