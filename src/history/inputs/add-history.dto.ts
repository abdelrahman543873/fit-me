import {
  Allow,
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ValidateIfDefined } from '../../shared/validators/validate-if-defined.validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { ObjectId } from 'mongoose';
import { utcStandardDateTransformer } from '../../shared/utils/utc-standard-date-transformer';
import { HISTORY_TYPE } from '../history.constants';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { IsExistingExercise } from '../../exercise/validators/existing-exercise.validator';

export class AddHistoryDto {
  @ApiProperty({ type: 'string' })
  @IsExistingExercise()
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  exercise: ObjectId;

  @IsEnum(HISTORY_TYPE)
  type: HISTORY_TYPE;

  @IsNumber()
  @Type(() => Number)
  value: number;

  @ValidateIfDefined()
  @IsInt()
  @Type(() => Number)
  reps?: number;

  @ValidateIfDefined()
  @ApiProperty({ type: String, format: 'binary' })
  @Allow()
  media?: string;

  @ValidateIfDefined()
  @IsNotEmpty()
  @IsString()
  comment?: string;

  @ValidateIfDefined()
  @IsDate()
  @Transform(utcStandardDateTransformer)
  measuredAt?: Date;
}
