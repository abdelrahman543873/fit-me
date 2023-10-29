import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { AddExerciseDto } from './inputs/add-exercise.dto';
import { Exercise, ExerciseDocument } from './exercise.schema';
import { FilterExercisesDto } from './inputs/filter-exercises.dto';
import { DeleteExerciseDto } from './inputs/delete-exercise.dto';

@Injectable()
export class ExerciseRepository extends BaseRepository<Exercise> {
  constructor(
    @InjectModel(Exercise.name)
    private exerciseSchema: Model<ExerciseDocument>,
  ) {
    super(exerciseSchema);
  }

  addExercise(
    trainer: ObjectId,
    addExerciseDto: AddExerciseDto,
    media: Array<Express.Multer.File>,
  ) {
    return this.exerciseSchema.create({
      trainer,
      ...addExerciseDto,
      ...(media && {
        media: media.map((mediaItem) => {
          return `${process.env.HOST}${mediaItem.filename}`;
        }),
      }),
    });
  }

  filterExercises(trainer: ObjectId, filterExercisesDto: FilterExercisesDto) {
    return this.exerciseSchema.find({ trainer, ...filterExercisesDto });
  }

  deleteExercise(trainer: ObjectId, deleteExerciseDto: DeleteExerciseDto) {
    return this.exerciseSchema.deleteOne({
      trainer,
      _id: deleteExerciseDto.id,
    });
  }
}
