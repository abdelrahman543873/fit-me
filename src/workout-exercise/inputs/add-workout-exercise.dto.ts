import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { Transform } from 'class-transformer';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { WORKOUT_STAGE } from '../workout-exercise.constants';
import {
  Allow,
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { IsExistingExercise } from '../../exercise/validators/existing-exercise.validator';
import { IsExistingWorkout } from '../../workout/validators/existing-workout.controller';
import { IsExerciseOwner } from '../../exercise/validators/exercise-owner.validator';
import { IsWorkoutOwner } from '../../workout/validators/workout-owner.validator';
import { User } from '../../user/user.schema';

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

  @ValidateIf((input) => 'minsDuration' in input)
  @IsInt()
  minsDuration: number;

  @ApiProperty({ isArray: true, type: Number })
  @ValidateIf((input) => 'sets' in input)
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
  sets?: Array<number>;

  @ApiProperty({ readOnly: true })
  @Allow()
  user?: User;
}
