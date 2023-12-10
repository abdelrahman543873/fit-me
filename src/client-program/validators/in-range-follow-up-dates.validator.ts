import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
@Injectable()
export class InRangeFollowupDatesValidator
  implements ValidatorConstraintInterface
{
  validate(
    followupDate: Date,
    validationArguments: ValidationArguments,
  ): boolean {
    const startDate: Date = validationArguments.object['startDate'];
    const endDate: Date = validationArguments.object['endDate'];
    if (followupDate < startDate || followupDate > endDate) return false;
    return true;
  }

  defaultMessage() {
    return 'follow up date must be within start and end date';
  }
}
export function IsInRangeFollowupDate(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: InRangeFollowupDatesValidator,
    });
  };
}
