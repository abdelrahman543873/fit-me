import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ObjectId, Types } from 'mongoose';
import { FormRepository } from '../form.repository';
import { User } from '../../user/user.schema';

@ValidatorConstraint({ async: true })
@Injectable()
export class FormOwnerValidator implements ValidatorConstraintInterface {
  constructor(private formRepository: FormRepository) {}
  async validate(
    id: ObjectId,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const user: User = JSON.parse(validationArguments.object['user']);
    const form = await this.formRepository.findOne({
      _id: id,
      trainerId: new Types.ObjectId(user._id as any),
    });
    if (!form) return false;
    return true;
  }

  defaultMessage() {
    return 'unauthorized form';
  }
}
export function IsFormOwner(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: FormOwnerValidator,
    });
  };
}
