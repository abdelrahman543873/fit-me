import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { User } from '../../user/user.schema';
import { QuestionRepository } from '../question.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class QuestionOwnerValidator implements ValidatorConstraintInterface {
  constructor(private questionRepository: QuestionRepository) {}
  async validate(
    id: ObjectId,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const user: User = JSON.parse(validationArguments.object['user']);
    const question = await this.questionRepository
      .findOne({
        _id: id,
      })
      .populate('form');
    if ((question.form as any).trainer.toString() !== (user._id as any))
      return false;
    return true;
  }

  defaultMessage() {
    return 'unauthorized question';
  }
}
export function IsQuestionOwner(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: QuestionOwnerValidator,
    });
  };
}
