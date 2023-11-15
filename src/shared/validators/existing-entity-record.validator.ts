import { ObjectId } from 'mongoose';
import {
  ValidationOptions,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { BaseRepository } from '../generics/repository.abstract';

export class ExistingEntityRecordValidator
  implements ValidatorConstraintInterface
{
  constructor(
    private repository: BaseRepository<any>,
    private modelName: string,
  ) {}

  async validate(id: ObjectId): Promise<boolean> {
    const entity = await this.repository.findOne({
      _id: id,
    });
    return !!entity;
  }

  defaultMessage() {
    return `this ${this.modelName.toLowerCase()} doesn't exist`;
  }
}

export function isExistingEntityRecordValidator(
  existingValidator: typeof ExistingEntityRecordValidator,
) {
  return function createValidator(validationOptions?: ValidationOptions) {
    return function (object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: existingValidator,
      });
    };
  };
}
