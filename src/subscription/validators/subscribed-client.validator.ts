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
import { SubscriptionRepository } from '../subscription.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class SubscribedClientValidator implements ValidatorConstraintInterface {
  constructor(private subscriptionRepository: SubscriptionRepository) {}
  async validate(
    client: ObjectId,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const trainer: User = JSON.parse(validationArguments.object['user']);
    const subscription = await this.subscriptionRepository.findOne({
      trainer: new Types.ObjectId(trainer._id as any),
      client,
    });
    if (!subscription) return false;
    return true;
  }

  defaultMessage() {
    return 'unauthorized client';
  }
}
export function IsClientSubscribed(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: SubscribedClientValidator,
    });
  };
}
