import { Module } from '@nestjs/common';
import { WorkoutController } from './workout.controller';
import { WorkoutService } from './workout.service';
import { WorkoutRepository } from './workout.repository';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Workout, WorkoutSchema } from './workout.schema';
import { ExistingWorkoutValidator } from './validators/existing-workout.controller';
import { WorkoutOwnerValidator } from './validators/workout-owner.validator';
import {
  WorkoutExercise,
  WorkoutExerciseSchema,
} from '../workout-exercise/workout-exercise.schema';
import { Model } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: WorkoutExercise.name,
        useFactory: () => WorkoutExerciseSchema,
      },
      {
        name: Workout.name,
        useFactory: (workoutExercise: Model<WorkoutExercise>) => {
          WorkoutSchema.pre('deleteOne', async function () {
            const doc = await this.model.findOne(this.getFilter());
            await workoutExercise.deleteMany({ workout: doc._id });
          });
          return WorkoutSchema;
        },
        inject: [getModelToken(WorkoutExercise.name)],
      },
    ]),
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
