import { ValidateIfDefined } from '../../shared/validators/validate-if-defined.validator';
import { IsDate } from 'class-validator';
import { Transform } from 'class-transformer';
import { utcStandardDateTransformer } from '../../shared/utils/utc-standard-date-transformer';

export class GetHistoryDatesDto {
  @ValidateIfDefined()
  @IsDate()
  @Transform(utcStandardDateTransformer)
  date?: Date;
}
