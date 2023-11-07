import { Type } from 'class-transformer';
import { IsBoolean } from 'class-validator';
import { ValidateIfDefined } from '../../shared/validators/validate-if-defined.validator';

export class FilterSubscriptionsDto {
  @ValidateIfDefined()
  @IsBoolean()
  @Type(() => Boolean)
  accepted?: boolean;
}
