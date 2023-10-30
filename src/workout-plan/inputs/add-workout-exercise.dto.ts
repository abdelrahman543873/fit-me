import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { Transform } from 'class-transformer';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { WORKOUT_STAGE } from '../workout-exercise.constants';
import { IsEnum, IsInt } from 'class-validator';

export class AddWorkoutExerciseDto {
  @ApiProperty({ type: 'string' })
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  exercise: ObjectId;

  @ApiProperty({ type: 'string' })
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  workout: ObjectId;

  @IsEnum(WORKOUT_STAGE)
  stage: WORKOUT_STAGE;

  @IsInt()
  minsDuration: number;

  @IsInt()
  sets: number;

  @IsInt()
  reps: number;
}
