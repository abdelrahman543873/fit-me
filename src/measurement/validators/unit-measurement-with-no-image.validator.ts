import { Injectable } from '@nestjs/common';
import {
  MEASUREMENT_CATEGORY,
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
export class UnitMeasurementWithNoImage
  implements ValidatorConstraintInterface
{
  validate(
    type: MEASUREMENT_TYPE,
    validationArguments: ValidationArguments,
  ): boolean {
    const measurementCategory = MEASUREMENT_CATEGORY[type];
    if (measurementCategory !== 'IMAGE' && validationArguments.object['media'])
      return false;
    return true;
  }

  defaultMessage() {
    return "unit measurements can't have an media";
  }
}
export function IsUnitMeasurementImageEmpty(
  validationOptions?: ValidationOptions,
) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UnitMeasurementWithNoImage,
    });
  };
}
