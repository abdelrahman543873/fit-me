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
export class ValidStartDate implements ValidatorConstraintInterface {
  validate(startDate: Date, validationArguments: ValidationArguments): boolean {
    const endDate = validationArguments.object['endDate'];
    if (startDate > endDate) {
      return false;
    }
    return true;
  }

  defaultMessage() {
    return 'end date must be bigger than start date';
  }
}
export function IsValidStartDate(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ValidStartDate,
    });
  };
}
