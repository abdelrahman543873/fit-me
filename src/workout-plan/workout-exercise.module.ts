import { Module } from '@nestjs/common';
import { WorkoutExerciseService } from './workout-exercise.service';
import { WorkoutExerciseController } from './workout-exercise.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  WorkoutExercise,
  WorkoutExerciseSchema,
} from './workout-exercise.schema';
import { WorkoutExerciseRepository } from './workout-exercise.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WorkoutExercise.name, schema: WorkoutExerciseSchema },
    ]),
  ],
  providers: [WorkoutExerciseService, WorkoutExerciseRepository],
  controllers: [WorkoutExerciseController],
})
export class WorkoutExerciseModule {}
