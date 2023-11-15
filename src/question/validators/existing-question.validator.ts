import { Injectable } from '@nestjs/common';
import { ValidatorConstraint } from 'class-validator';
import { QuestionRepository } from '../question.repository';
import {
  ExistingEntityRecordValidator,
  isExistingEntityRecordValidator,
} from '../../shared/validators/existing-entity-record.validator';
import { Question } from '../question.schema';

@ValidatorConstraint({ async: true })
@Injectable()
export class ExistingQuestionValidator extends ExistingEntityRecordValidator {
  constructor(questionRepository: QuestionRepository) {
    super(questionRepository, Question.name);
  }
}
export const IsExistingQuestion = isExistingEntityRecordValidator(
  ExistingQuestionValidator,
);
