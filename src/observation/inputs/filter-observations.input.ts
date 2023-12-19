import { PartialType } from '@nestjs/swagger';
import { AddObservationDto } from './add-observation.input';

export class FilterObservationsDto extends PartialType(AddObservationDto) {}
