import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { QuestionRepository } from '../question.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class ExistingQuestionValidator implements ValidatorConstraintInterface {
  constructor(private questionRepository: QuestionRepository) {}
  async validate(id: ObjectId): Promise<boolean> {
    const question = await this.questionRepository.findOne({
      _id: id,
    });
    if (!question) return false;
    return true;
  }

  defaultMessage() {
    return "this question doesn't exist";
  }
}
export function IsExistingQuestion(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ExistingQuestionValidator,
    });
  };
}
