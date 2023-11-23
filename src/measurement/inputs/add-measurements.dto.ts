import { Transform } from 'class-transformer';
import { Allow, IsArray, ValidateNested } from 'class-validator';
import { AddMeasurementDto } from './add-measurement.dto';
import { ApiProperty } from '@nestjs/swagger';
import { clientMeasurementsTransformer } from '../transformers/client-measurements.transformer';

export class AddMeasurementsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Transform(clientMeasurementsTransformer)
  measurements: AddMeasurementDto[];

  @ApiProperty({ readOnly: true })
  @Allow()
  user?;
}
