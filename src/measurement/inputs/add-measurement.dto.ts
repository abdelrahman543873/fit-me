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
import { Type } from 'class-transformer';
import { IsCorrectMeasurementUnit } from '../validators/correct-measurement-unit.validator';
import { IsImageInImageMeasurement } from '../validators/image-measurement-has-image.validator';
import { IsCorrectMeasurementValue } from '../validators/correct-measurement-value.validator';
import { IsUnitMeasurementImageEmpty } from '../validators/unit-measurment-with-no-image.validator';

export class AddMeasurementDto {
  @IsUnitMeasurementImageEmpty()
  @IsCorrectMeasurementValue()
  @IsImageInImageMeasurement()
  @IsCorrectMeasurementUnit()
  @IsEnum(MEASUREMENT_TYPE)
  type: string;

  @ValidateIfDefined()
  @IsNumber()
  @Type(() => Number)
  value?: number;

  @ValidateIfDefined()
  @ApiProperty({ type: 'string', format: 'binary' })
  @Allow()
  media?: string;

  @ValidateIfDefined()
  @IsDate()
  @Type(() => Date)
  measuredAt?: Date;

  @ValidateIfDefined()
  @IsNotEmpty()
  @IsString()
  unit?: string;
}
