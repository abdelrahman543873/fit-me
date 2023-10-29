import { Injectable } from '@nestjs/common';
import { ExerciseRepository } from './exercise.repository';
import { AddExerciseDto } from './inputs/add-exercise.dto';
import { ObjectId } from 'mongoose';
import { FilterExercisesDto } from './inputs/filter-exercises.dto';
import { DeleteExerciseDto } from './inputs/delete-exercise.dto';

@Injectable()
export class ExerciseService {
  constructor(private readonly exerciseRepository: ExerciseRepository) {}

  addExercise(
    trainer: ObjectId,
    addExerciseDto: AddExerciseDto,
    media: Array<Express.Multer.File>,
  ) {
    return this.exerciseRepository.addExercise(trainer, addExerciseDto, media);
  }

  filterExercises(trainer: ObjectId, filterExercisesDto: FilterExercisesDto) {
    return this.exerciseRepository.filterExercises(trainer, filterExercisesDto);
  }

  deleteExercise(trainer: ObjectId, deleteExerciseDto: DeleteExerciseDto) {
    return this.exerciseRepository.deleteExercise(trainer, deleteExerciseDto);
  }
}
