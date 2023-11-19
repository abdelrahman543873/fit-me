import { Injectable } from '@nestjs/common';
import {
  MEASUREMENT_CATEGORY,
  MEASUREMENT_CATEGORY_UNITS,
  MEASUREMENT_TYPE,
} from '../measurement.constants';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
@Injectable()
export class CorrectMeasurementValue implements ValidatorConstraintInterface {
  validate(
    type: MEASUREMENT_TYPE,
    validationArguments: ValidationArguments,
  ): boolean {
    const measurementCategory = MEASUREMENT_CATEGORY[type];
    const measurementUnits = MEASUREMENT_CATEGORY_UNITS[
      measurementCategory
    ] as [string];
    if (measurementUnits && !validationArguments.object['value']) return false;
    if (measurementCategory === 'IMAGE' && validationArguments.object['value'])
      return false;
    return true;
  }

  defaultMessage() {
    return 'incorrect measurement value';
  }
}
export function IsCorrectMeasurementValue(
  validationOptions?: ValidationOptions,
) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CorrectMeasurementValue,
    });
  };
}
