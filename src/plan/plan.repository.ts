import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Plan, PlanDocument } from './plan.schema';
import { Model, ObjectId } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { AddPlanDto } from './inputs/add-plan.dto';
import { DeletePlanDto } from './inputs/delete-plan.dto';

@Injectable()
export class PlanRepository extends BaseRepository<Plan> {
  constructor(
    @InjectModel(Plan.name)
    private planSchema: Model<PlanDocument>,
  ) {
    super(planSchema);
  }

  addPlan(trainerId: ObjectId, addPlanDto: AddPlanDto) {
    return this.planSchema.create({ trainerId, ...addPlanDto });
  }

  deletePlan(trainerId: ObjectId, deletePlanDto: DeletePlanDto) {
    return this.planSchema.deleteOne({ trainerId, _id: deletePlanDto.id });
  }
}
