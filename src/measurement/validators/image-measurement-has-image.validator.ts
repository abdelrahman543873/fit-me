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
export class ImageMeasurementHasImage implements ValidatorConstraintInterface {
  validate(
    type: MEASUREMENT_TYPE,
    validationArguments: ValidationArguments,
  ): boolean {
    const measurementCategory = MEASUREMENT_CATEGORY[type];
    if (measurementCategory === 'IMAGE' && !validationArguments.object['media'])
      return false;
    return true;
  }

  defaultMessage() {
    return 'image measurement must have an image';
  }
}
export function IsImageInImageMeasurement(
  validationOptions?: ValidationOptions,
) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ImageMeasurementHasImage,
    });
  };
}
