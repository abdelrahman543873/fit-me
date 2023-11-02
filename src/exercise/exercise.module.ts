import { Module } from '@nestjs/common';
import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';
import { ExerciseRepository } from './exercise.repository';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Exercise, ExerciseSchema } from './exercise.schema';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { filename } from '../shared/utils/multer-file-name';
import { ExistingExerciseValidator } from './validators/existing-exercise.validator';
import { ExerciseOwnerValidator } from './validators/exercise-owner.validator';
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
        name: Exercise.name,
        useFactory: (workoutExercise: Model<WorkoutExercise>) => {
          ExerciseSchema.pre('deleteOne', async function () {
            const doc = await this.model.findOne(this.getFilter());
            await workoutExercise.deleteMany({ exercise: doc._id });
          });
          return ExerciseSchema;
        },
        inject: [getModelToken(WorkoutExercise.name)],
      },
    ]),
    MulterModule.register({
      preservePath: true,
      storage: diskStorage({
        destination: './client',
        filename,
      }),
    }),
  ],
  controllers: [ExerciseController],
  providers: [
    ExerciseService,
    ExerciseRepository,
    ExistingExerciseValidator,
    ExerciseOwnerValidator,
  ],
})
export class ExerciseModule {}
