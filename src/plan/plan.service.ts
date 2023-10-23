import { Injectable } from '@nestjs/common';
import { PlanRepository } from './plan.repository';
import { AddPlanDto } from './inputs/add-plan.dto';
import { ObjectId } from 'mongoose';

@Injectable()
export class PlanService {
  constructor(private readonly planRepository: PlanRepository) {}
  addPlan(trainerId: ObjectId, addPlanDto: AddPlanDto) {
    return this.planRepository.addPlan(trainerId, addPlanDto);
  }
}
