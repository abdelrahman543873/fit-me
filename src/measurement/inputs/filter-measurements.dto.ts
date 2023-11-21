import { PartialType, ApiProperty } from '@nestjs/swagger';
import { AddMeasurementDto } from './add-measurement.dto';
import { ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { IsExistingClient } from '../../client/validators/existing-client.validator';
import { ValidateIfDefined } from '../../shared/validators/validate-if-defined.validator';
import { IsEnum } from 'class-validator';
import { MEASUREMENT_TYPE } from '../measurement.constants';

export class FilterMeasurementsDto extends PartialType(AddMeasurementDto) {
  @ApiProperty({ type: 'string' })
  @ValidateIfDefined()
  @IsExistingClient()
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  client?: ObjectId;

  @IsEnum(MEASUREMENT_TYPE)
  type: MEASUREMENT_TYPE;
}
