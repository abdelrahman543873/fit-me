import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { AddExerciseDto } from './inputs/add-exercise.dto';
import { Exercise, ExerciseDocument } from './exercise.schema';

@Injectable()
export class ExerciseRepository extends BaseRepository<Exercise> {
  constructor(
    @InjectModel(Exercise.name)
    private exerciseDocument: Model<ExerciseDocument>,
  ) {
    super(exerciseDocument);
  }

  addExercise(
    trainer: ObjectId,
    addExerciseDto: AddExerciseDto,
    media: Array<Express.Multer.File>,
  ) {
    return this.exerciseDocument.create({
      trainer,
      ...addExerciseDto,
      ...(media && {
        media: media.map((mediaItem) => {
          return `${process.env.HOST}${mediaItem.filename}`;
        }),
      }),
    });
  }
}
