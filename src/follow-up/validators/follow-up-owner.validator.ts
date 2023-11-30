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
import { FollowUpRepository } from '../follow-up.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class FollowUpOwnerValidator implements ValidatorConstraintInterface {
  constructor(private followUpRepository: FollowUpRepository) {}
  async validate(
    id: ObjectId,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const user: User = JSON.parse(validationArguments.object['user']);
    const followUp = await this.followUpRepository.findOne({
      _id: id,
      $or: [
        {
          trainer: new Types.ObjectId(user._id as any),
        },
        {
          client: new Types.ObjectId(user._id as any),
        },
      ],
    });
    if (!followUp) return false;
    return true;
  }

  defaultMessage() {
    return 'unauthorized follow up';
  }
}
export function IsFollowUpOwner(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: FollowUpOwnerValidator,
    });
  };
}
