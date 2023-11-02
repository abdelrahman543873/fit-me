import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { AddWorkoutExerciseDto } from './add-workout-exercise.dto';
import { Type } from 'class-transformer';

export class AddWorkoutExercisesDto {
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @IsArray()
  @Type(() => AddWorkoutExerciseDto)
  workoutExercises: AddWorkoutExerciseDto[];
}
