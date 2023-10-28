import { FOLLOW_UP_FREQUENCY } from '../plan.constants';
import { IsEnum, IsOptional } from 'class-validator';

export class FilterPlansDto {
  @IsOptional()
  @IsEnum(FOLLOW_UP_FREQUENCY)
  followUpFrequency?: FOLLOW_UP_FREQUENCY;
}
