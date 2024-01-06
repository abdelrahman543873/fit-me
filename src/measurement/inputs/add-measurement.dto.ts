import {
  Allow,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { MEASUREMENT_TYPE } from '../measurement.constants';
import { ValidateIfDefined } from '../../shared/validators/validate-if-defined.validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { IsCorrectMeasurementUnit } from '../validators/correct-measurement-unit.validator';
import { IsImageInImageMeasurement } from '../validators/image-measurement-has-image.validator';
import { IsCorrectMeasurementValue } from '../validators/correct-measurement-value.validator';
import { IsUnitMeasurementImageEmpty } from '../validators/unit-measurement-with-no-image.validator';
import { ObjectId } from 'mongoose';
import { utcStandardDateTransformer } from '../../shared/utils/utc-standard-date-transformer';

export class AddMeasurementDto {
  @IsUnitMeasurementImageEmpty()
  @IsCorrectMeasurementValue()
  @IsImageInImageMeasurement()
  @IsCorrectMeasurementUnit()
  @IsEnum(MEASUREMENT_TYPE)
  type: MEASUREMENT_TYPE;

  @ValidateIfDefined()
  @IsNumber()
  @Type(() => Number)
  value?: number;

  @ValidateIfDefined()
  @ApiProperty({ type: String, format: 'binary' })
  @Allow()
  media?: string;

  @ValidateIfDefined()
  @IsDate()
  @Transform(utcStandardDateTransformer)
  measuredAt?: Date;

  @ValidateIfDefined()
  @IsNotEmpty()
  @IsString()
  unit?: string;

  @ApiProperty({ readOnly: true })
  @Allow()
  client: ObjectId;
}
