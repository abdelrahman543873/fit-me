import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { FormRepository } from '../form.repository';
import { FORM_TYPES } from '../form.constants';

@ValidatorConstraint({ async: true })
@Injectable()
export class FollowUpFormValidator implements ValidatorConstraintInterface {
  constructor(private formRepository: FormRepository) {}
  async validate(id: ObjectId): Promise<boolean> {
    const form = await this.formRepository.findOne({
      _id: id,
    });
    if (form?.type !== FORM_TYPES.FOLLOW_UP) return false;
    return true;
  }

  defaultMessage() {
    return 'form has to be a follow up form';
  }
}
export function IsFollowUpForm(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: FollowUpFormValidator,
    });
  };
}
