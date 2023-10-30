import { Module } from '@nestjs/common';
import { WorkoutController } from './workout.controller';
import { WorkoutService } from './workout.service';
import { WorkoutRepository } from './workout.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Workout, WorkoutSchema } from './workout.schema';
import { ExistingWorkoutValidator } from './validators/existing-workout.controller';
import { WorkoutOwnerValidator } from './validators/workout-owner.validator';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Workout.name, schema: WorkoutSchema }]),
  ],
  controllers: [WorkoutController],
  providers: [
    WorkoutService,
    WorkoutRepository,
    ExistingWorkoutValidator,
    WorkoutOwnerValidator,
  ],
})
export class WorkoutModule {}
