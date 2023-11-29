import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { QuestionRepository } from '../question.repository';
import { FORM_TYPES } from '../../form/form.constants';

@ValidatorConstraint({ async: true })
@Injectable()
export class FollowUpQuestionHasFollowUpValidator
  implements ValidatorConstraintInterface
{
  private questionBelongsToFollowup = false;
  constructor(private questionRepository: QuestionRepository) {}
  async validate(
    id: ObjectId,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const followUp: ObjectId = validationArguments.object['followUp'];
    const question = await this.questionRepository
      .findOne({
        _id: id,
      })
      .populate('form');
    if (!followUp && question.form['type'] === FORM_TYPES.FOLLOW_UP)
      return false;
    if (followUp && question.form['type'] !== FORM_TYPES.FOLLOW_UP)
      return false;
    if (
      // this form property is coming from the IsQuestionOfFollowUp validator
      validationArguments.object['form'] !== question.form['_id'].toString() &&
      question.form['type'] === FORM_TYPES.FOLLOW_UP
    ) {
      this.questionBelongsToFollowup = false;
      return false;
    }
    return true;
  }

  defaultMessage() {
    return !this.questionBelongsToFollowup
      ? "this question doesn't belong to this follow up"
      : 'follow up question only must have followup';
  }
}
export function FollowUpQuestionHasFollowUp(
  validationOptions?: ValidationOptions,
) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: FollowUpQuestionHasFollowUpValidator,
    });
  };
}
