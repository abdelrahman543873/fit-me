import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { FollowUpRepository } from '../follow-up.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class QuestionOfFollowUpValidator
  implements ValidatorConstraintInterface
{
  constructor(private followUpRepository: FollowUpRepository) {}
  async validate(
    id: ObjectId,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const followUp = await this.followUpRepository.findOne({
      _id: id,
    });
    validationArguments.object['form'] = followUp.form.toString();
    return true;
  }

  defaultMessage() {
    return "this question doesn't belong to this follow up";
  }
}
export function IsQuestionOfFollowUp(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: QuestionOfFollowUpValidator,
    });
  };
}
