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
export class FormHasQuestionsValidator implements ValidatorConstraintInterface {
  constructor(private questionRepository: QuestionRepository) {}
  async validate(form: ObjectId): Promise<boolean> {
    const question = await this.questionRepository.find({
      form,
    });
    if (!question.length) return false;
    return true;
  }

  defaultMessage() {
    return "form doesn't have questions";
  }
}
export function HasQuestions(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: FormHasQuestionsValidator,
    });
  };
}
