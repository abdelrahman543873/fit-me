import { Injectable } from '@nestjs/common';
import { PlanRepository } from './plan.repository';
import { AddPlanDto } from './inputs/add-plan.dto';
import { ObjectId } from 'mongoose';
import { DeletePlanDto } from './inputs/delete-plan.dto';

@Injectable()
export class PlanService {
  constructor(private readonly planRepository: PlanRepository) {}
  addPlan(trainerId: ObjectId, addPlanDto: AddPlanDto) {
    return this.planRepository.addPlan(trainerId, addPlanDto);
  }

  deletePlan(trainerId: ObjectId, deletePlanDto: DeletePlanDto) {
    return this.planRepository.deletePlan(trainerId, deletePlanDto);
  }
}
