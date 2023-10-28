import { Injectable } from '@nestjs/common';
import { PlanRepository } from './plan.repository';
import { AddPlanDto } from './inputs/add-plan.dto';
import { ObjectId } from 'mongoose';
import { DeletePlanDto } from './inputs/delete-plan.dto';
import { FilterPlansDto } from './inputs/filter-plans.dto';

@Injectable()
export class PlanService {
  constructor(private readonly planRepository: PlanRepository) {}
  addPlan(trainer: ObjectId, addPlanDto: AddPlanDto) {
    return this.planRepository.addPlan(trainer, addPlanDto);
  }

  deletePlan(trainer: ObjectId, deletePlanDto: DeletePlanDto) {
    return this.planRepository.deletePlan(trainer, deletePlanDto);
  }

  filterPlans(trainer: ObjectId, filterPlansDto: FilterPlansDto) {
    return this.planRepository.filterPlans(trainer, filterPlansDto);
  }
}
