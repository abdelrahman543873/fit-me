import { PartialType } from '@nestjs/swagger';
import { AddObservationDto } from './add-observation.input';
import { Allow } from 'class-validator';

export class UpdateObservationDto extends PartialType(AddObservationDto) {
  @Allow()
  user?;
}
