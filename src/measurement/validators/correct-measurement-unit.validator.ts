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
export class CorrectMeasurementUnitValidator
  implements ValidatorConstraintInterface
{
  validate(
    type: MEASUREMENT_TYPE,
    validationArguments: ValidationArguments,
  ): boolean {
    const measurementCategory = MEASUREMENT_CATEGORY[type];
    const measurementUnits = MEASUREMENT_CATEGORY_UNITS[
      measurementCategory
    ] as [string];
    if (measurementCategory === 'IMAGE' && validationArguments.object['unit'])
      return false;
    if (
      measurementCategory !== 'IMAGE' &&
      !measurementUnits.includes(validationArguments.object['unit'])
    ) {
      return false;
    }
    return true;
  }

  defaultMessage() {
    return 'invalid measurement unit';
  }
}
export function IsCorrectMeasurementUnit(
  validationOptions?: ValidationOptions,
) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CorrectMeasurementUnitValidator,
    });
  };
}
