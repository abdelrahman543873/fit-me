import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { PlanRepository } from '../plan.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class ExistingPlanValidator implements ValidatorConstraintInterface {
  constructor(private planRepository: PlanRepository) {}
  async validate(id: ObjectId): Promise<boolean> {
    const plan = await this.planRepository.findOne({
      _id: id,
    });
    if (!plan) return false;
    return true;
  }

  defaultMessage() {
    return "this plan doesn't exist";
  }
}
export function IsExistingPlan(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ExistingPlanValidator,
    });
  };
}
