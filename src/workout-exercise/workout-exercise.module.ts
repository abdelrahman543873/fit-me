import { Module } from '@nestjs/common';
import { WorkoutExerciseService } from './workout-exercise.service';
import { WorkoutExerciseController } from './workout-exercise.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  WorkoutExercise,
  WorkoutExerciseSchema,
} from './workout-exercise.schema';
import { WorkoutExerciseRepository } from './workout-exercise.repository';
import { ExistingWorkoutExerciseValidator } from './validators/existing-workout-exercise.validator';
import { WorkoutExerciseOwnerValidator } from './validators/workout-exercise-owner';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WorkoutExercise.name, schema: WorkoutExerciseSchema },
    ]),
  ],
  providers: [
    WorkoutExerciseService,
    WorkoutExerciseRepository,
    ExistingWorkoutExerciseValidator,
    WorkoutExerciseOwnerValidator,
  ],
  controllers: [WorkoutExerciseController],
})
export class WorkoutExerciseModule {}
