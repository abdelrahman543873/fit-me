import { Module } from '@nestjs/common';
import { ProgramWorkoutService } from './program-workout.service';
import { ProgramWorkoutController } from './program-workout.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProgramWorkout, ProgramWorkoutSchema } from './program-workout.schema';
import { ProgramWorkoutRepository } from './program-workout.repository';
import { ProgramWorkoutOwnerValidator } from './validators/program-workout-owner.validator';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProgramWorkout.name, schema: ProgramWorkoutSchema },
    ]),
  ],
  providers: [
    ProgramWorkoutService,
    ProgramWorkoutRepository,
    ProgramWorkoutOwnerValidator,
  ],
  controllers: [ProgramWorkoutController],
})
export class ProgramWorkoutModule {}
