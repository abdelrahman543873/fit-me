import { Type } from 'class-transformer';
import { Allow, IsArray, ValidateNested } from 'class-validator';
import { AddMeasurementDto } from './add-measurement.dto';
import { User } from '../../user/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export class AddMeasurementsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddMeasurementDto)
  measurements: AddMeasurementDto[];

  @ApiProperty({ readOnly: true })
  @Allow()
  user?: User;
}
