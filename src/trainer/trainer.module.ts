import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Trainer, TrainerSchema } from './trainer.schema';
import { TrainerController } from './trainer.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Trainer.name, schema: TrainerSchema }]),
  ],
  controllers: [TrainerController],
})
export class TrainerModule {}
