import { PartialType, ApiProperty } from '@nestjs/swagger';
import { AddMeasurementDto } from './add-measurement.dto';
import { ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { IsExistingClient } from '../../client/validators/existing-client.validator';
import { ValidateIfDefined } from '../../shared/validators/validate-if-defined.validator';

export class FilterMeasurementsDto extends PartialType(AddMeasurementDto) {
  @ApiProperty({ type: 'string' })
  @ValidateIfDefined()
  @IsExistingClient()
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  client?: ObjectId;
}
