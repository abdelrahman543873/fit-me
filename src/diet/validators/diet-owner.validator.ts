import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ObjectId, Types } from 'mongoose';
import { User } from '../../user/user.schema';
import { DietRepository } from '../diet.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class DietOwnerValidator implements ValidatorConstraintInterface {
  constructor(private dietRepository: DietRepository) {}
  async validate(
    id: ObjectId,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const user: User = JSON.parse(validationArguments.object['user']);
    const diet = await this.dietRepository.findOne({
      _id: id,
      trainer: new Types.ObjectId(user._id as any),
    });
    if (!diet) return false;
    return true;
  }

  defaultMessage() {
    return 'unauthorized diet';
  }
}
export function IsDietOwner(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: DietOwnerValidator,
    });
  };
}
