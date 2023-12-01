import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { FormRepository } from '../form.repository';
import { FORM_TYPES } from '../form.constants';

@ValidatorConstraint({ async: true })
@Injectable()
export class FollowUpFormHasFollowUpValidator
  implements ValidatorConstraintInterface
{
  constructor(private formRepository: FormRepository) {}
  async validate(
    id: ObjectId,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const form = await this.formRepository.findOne({
      _id: id,
    });
    if (
      form?.type === FORM_TYPES.FOLLOW_UP &&
      !validationArguments.object['followUp']
    ) {
      return false;
    }
    return true;
  }

  defaultMessage() {
    return 'follow up form has to have follow up';
  }
}
export function FollowUpFormHasFollowUp(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: FollowUpFormHasFollowUpValidator,
    });
  };
}
