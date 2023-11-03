import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AddProgramWorkoutDto } from './add-program-workout.dto';

export class AddProgramWorkoutsDto {
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @IsArray()
  @Type(() => AddProgramWorkoutDto)
  programWorkouts: AddProgramWorkoutDto[];
}
