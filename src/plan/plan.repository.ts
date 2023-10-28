import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Plan, PlanDocument } from './plan.schema';
import { Model, ObjectId } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { AddPlanDto } from './inputs/add-plan.dto';
import { DeletePlanDto } from './inputs/delete-plan.dto';
import { FilterPlansDto } from './inputs/filter-plans.dto';

@Injectable()
export class PlanRepository extends BaseRepository<Plan> {
  constructor(
    @InjectModel(Plan.name)
    private planSchema: Model<PlanDocument>,
  ) {
    super(planSchema);
  }

  addPlan(trainer: ObjectId, addPlanDto: AddPlanDto) {
    return this.planSchema.create({ trainer, ...addPlanDto });
  }

  deletePlan(trainer: ObjectId, deletePlanDto: DeletePlanDto) {
    return this.planSchema.deleteOne({ trainer, _id: deletePlanDto.id });
  }

  filterPlans(filterPlansDto: FilterPlansDto) {
    return this.planSchema.find(filterPlansDto);
  }
}
