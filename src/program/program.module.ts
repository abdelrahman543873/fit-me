import { Module } from '@nestjs/common';
import { ProgramController } from './program.controller';
import { ProgramService } from './program.service';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Program, ProgramSchema } from './program.schema';
import { ProgramRepository } from './program.repository';
import { ProgramOwnerValidator } from './validators/program-owner.validator';
import {
  ProgramWorkout,
  ProgramWorkoutSchema,
} from '../program-workout/program-workout.schema';
import { Model } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: ProgramWorkout.name,
        useFactory: () => ProgramWorkoutSchema,
      },
      {
        name: Program.name,
        useFactory: (programWorkout: Model<ProgramWorkout>) => {
          ProgramSchema.pre('deleteOne', async function () {
            const doc = await this.model.findOne(this.getFilter());
            await programWorkout.deleteMany({ program: doc._id });
          });
          return ProgramSchema;
        },
        inject: [getModelToken(ProgramWorkout.name)],
      },
    ]),
  ],
  controllers: [ProgramController],
  providers: [ProgramService, ProgramRepository, ProgramOwnerValidator],
})
export class ProgramModule {}
