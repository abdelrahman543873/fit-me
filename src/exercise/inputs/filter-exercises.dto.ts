import { IsEnum, IsOptional } from 'class-validator';
import { MUSCLE_GROUP } from '../exercise.constants';

export class FilterExercisesDto {
  @IsOptional()
  @IsEnum(MUSCLE_GROUP)
  muscleGroup?: MUSCLE_GROUP;
}
