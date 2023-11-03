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
import { ProgramRepository } from '../program.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class ProgramOwnerValidator implements ValidatorConstraintInterface {
  constructor(private programRepository: ProgramRepository) {}
  async validate(
    id: ObjectId,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const user: User = JSON.parse(validationArguments.object['user']);
    const program = await this.programRepository.findOne({
      _id: id,
      trainer: new Types.ObjectId(user._id as any),
    });
    if (!program) return false;
    return true;
  }

  defaultMessage() {
    return 'unauthorized program';
  }
}
export function IsProgramOwner(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ProgramOwnerValidator,
    });
  };
}
