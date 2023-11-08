import { IsEnum } from 'class-validator';
import { ValidateIfDefined } from '../../shared/validators/validate-if-defined.validator';
import { SUBSCRIPTION_STATUS } from '../subscription.constants';

export class FilterSubscriptionsDto {
  @ValidateIfDefined()
  @IsEnum(SUBSCRIPTION_STATUS)
  status?: SUBSCRIPTION_STATUS;
}
