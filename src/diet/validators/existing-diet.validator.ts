import { Injectable } from '@nestjs/common';
import { ValidatorConstraint } from 'class-validator';
import {
  ExistingEntityRecordValidator,
  isExistingEntityRecordValidator,
} from '../../shared/validators/existing-entity-record.validator';
import { DietRepository } from '../diet.repository';
import { Diet } from '../diet.schema';

@Injectable()
@ValidatorConstraint({ async: true })
export class ExistingDietValidator extends ExistingEntityRecordValidator {
  constructor(dietRepository: DietRepository) {
    super(dietRepository, Diet.name);
  }
}
export const IsExistingDiet = isExistingEntityRecordValidator(
  ExistingDietValidator,
);
