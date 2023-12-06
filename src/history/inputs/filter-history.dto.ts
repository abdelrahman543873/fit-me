import { PartialType } from '@nestjs/swagger';
import { AddHistoryDto } from './add-history.dto';
import { Transform } from 'class-transformer';
import { utcStandardDateTransformer } from '../../shared/utils/utc-standard-date-transformer';
import { IsDate } from 'class-validator';
import { ValidateIfDefined } from '../../shared/validators/validate-if-defined.validator';

export class FilterHistoryDto extends PartialType(AddHistoryDto) {
  @ValidateIfDefined()
  @IsDate()
  @Transform(utcStandardDateTransformer)
  createdAt?: Date;
}
