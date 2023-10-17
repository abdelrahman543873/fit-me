import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepository } from '../user.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class ExistingPhoneNumberValidator
  implements ValidatorConstraintInterface
{
  constructor(private userRepository: UserRepository) {}
  async validate(phoneNumber: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      phoneNumber,
    });
    if (user) return false;
    return true;
  }

  defaultMessage() {
    return 'this phone number already exists';
  }
}
export function IsExistingPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ExistingPhoneNumberValidator,
    });
  };
}
