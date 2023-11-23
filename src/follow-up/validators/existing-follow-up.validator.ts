import { Injectable } from '@nestjs/common';
import {
  ExistingEntityRecordValidator,
  isExistingEntityRecordValidator,
} from '../../shared/validators/existing-entity-record.validator';
import { ValidatorConstraint } from 'class-validator';
import { FollowUp } from '../follow-up.schema';
import { FollowUpRepository } from '../follow-up.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class ExistingFollowUpValidator extends ExistingEntityRecordValidator {
  constructor(planRepository: FollowUpRepository) {
    super(planRepository, FollowUp.name);
  }
}
export const IsExistingFollowUp = isExistingEntityRecordValidator(
  ExistingFollowUpValidator,
);
