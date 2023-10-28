import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { FormRepository } from '../form.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class ExistingFormValidator implements ValidatorConstraintInterface {
  constructor(private formRepository: FormRepository) {}
  async validate(id: ObjectId): Promise<boolean> {
    const form = await this.formRepository.findOne({
      _id: id,
    });
    if (!form) return false;
    return true;
  }

  defaultMessage() {
    return "this form doesn't exist";
  }
}
export function IsExistingForm(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ExistingFormValidator,
    });
  };
}
