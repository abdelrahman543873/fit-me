import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { Transform } from 'class-transformer';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { WORKOUT_STAGE } from '../workout-exercise.constants';
import { Allow, ArrayNotEmpty, IsArray, IsEnum, IsInt } from 'class-validator';
import { IsExistingExercise } from '../../exercise/validators/existing-exercise.validator';
import { IsExistingWorkout } from '../../workout/validators/existing-workout.controller';
import { IsExerciseOwner } from '../../exercise/validators/exercise-owner.validator';
import { IsWorkoutOwner } from '../../workout/validators/workout-owner.validator';
import { ValidateIfDefined } from '../../shared/validators/validate-if-defined.validator';

export class AddWorkoutExerciseDto {
  @ApiProperty({ type: 'string' })
  @IsExerciseOwner()
  @IsExistingExercise()
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  exercise: ObjectId;

  @ApiProperty({ type: 'string' })
  @IsWorkoutOwner()
  @IsExistingWorkout()
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  workout: ObjectId;

  @IsEnum(WORKOUT_STAGE)
  stage: WORKOUT_STAGE;

  @ValidateIfDefined()
  @IsInt()
  minsDuration?: number;

  @ValidateIfDefined()
  @ApiProperty({ isArray: true, type: Number })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
  sets?: Array<number>;

  @ApiProperty({ readOnly: true })
  @Allow()
  user?;
}
