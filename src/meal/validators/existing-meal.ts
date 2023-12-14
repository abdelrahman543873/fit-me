import { Injectable } from '@nestjs/common';
import {
  ExistingEntityRecordValidator,
  isExistingEntityRecordValidator,
} from '../../shared/validators/existing-entity-record.validator';
import { ValidatorConstraint } from 'class-validator';
import { Meal } from '../meal.schema';
import { MealRepository } from '../meal.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class ExistingMealValidator extends ExistingEntityRecordValidator {
  constructor(mealRepository: MealRepository) {
    super(mealRepository, Meal.name);
  }
}
export const IsExistingMeal = isExistingEntityRecordValidator(
  ExistingMealValidator,
);
