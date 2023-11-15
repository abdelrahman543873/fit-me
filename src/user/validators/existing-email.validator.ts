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
export class ExistingEmailValidator implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}
  async validate(email: string): Promise<boolean> {
    const emailRecord = await this.userRepository.findOne({
      email: email.toLowerCase(),
    });
    if (emailRecord) return false;
    return true;
  }

  defaultMessage() {
    return 'this email already exists';
  }
}
export function IsExistingEmail(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ExistingEmailValidator,
    });
  };
}
