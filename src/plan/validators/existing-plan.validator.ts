import { Injectable } from '@nestjs/common';
import { PlanRepository } from '../plan.repository';
import {
  ExistingEntityRecordValidator,
  isExistingEntityRecordValidator,
} from '../../shared/validators/existing-entity-record.validator';
import { Plan } from '../plan.schema';
import { ValidatorConstraint } from 'class-validator';

@Injectable()
@ValidatorConstraint({ async: true })
export class ExistingPlanValidator extends ExistingEntityRecordValidator {
  constructor(planRepository: PlanRepository) {
    super(planRepository, Plan.name);
  }
}
export const IsExistingPlan = isExistingEntityRecordValidator(
  ExistingPlanValidator,
);
