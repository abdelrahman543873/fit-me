import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepository } from '../user.repository';
import { USER_ROLE } from '../user.constants';
import { Types } from 'mongoose';

@ValidatorConstraint({ async: true })
@Injectable()
export class ExistingTrainerValidator implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}
  async validate(id: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      _id: new Types.ObjectId(id),
    });
    if (!user) return false;
    if (user.role !== USER_ROLE.TRAINER) return false;
    return true;
  }

  defaultMessage() {
    return "this trainer doesn't exist";
  }
}
export function IsExistingTrainer(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ExistingTrainerValidator,
    });
  };
}
