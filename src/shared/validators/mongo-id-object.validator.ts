import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ObjectId, Types } from 'mongoose';

@ValidatorConstraint()
@Injectable()
export class MongoIdObjectValidator implements ValidatorConstraintInterface {
  validate(mongIdObject: ObjectId): boolean {
    if (mongIdObject instanceof Types.ObjectId) return true;
    return false;
  }

  defaultMessage() {
    return 'this is incorrect mongo id';
  }
}
export function IsMongoIdObject(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: MongoIdObjectValidator,
    });
  };
}
