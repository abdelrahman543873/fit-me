import { Module } from '@nestjs/common';
import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';
import { ExerciseRepository } from './exercise.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Exercise, ExerciseSchema } from './exercise.schema';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { filename } from '../shared/utils/multer-file-name';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Exercise.name, schema: ExerciseSchema },
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
  providers: [ExerciseService, ExerciseRepository],
})
export class ExerciseModule {}
