import { Body, Controller, Delete, Post, Request } from '@nestjs/common';
import { PlanService } from './plan.service';
import { AddPlanDto } from './inputs/add-plan.dto';
import { RequestContext } from '../shared/interfaces/request-context.interface';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Plan } from './plan.schema';
import { DeletePlanDto } from './inputs/delete-plan.dto';

@ApiBearerAuth()
@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  async addPlan(
    @Request() request: RequestContext,
    @Body() addPlanDto: AddPlanDto,
  ): Promise<Plan> {
    return await this.planService.addPlan(request.user._id, addPlanDto);
  }

  @Delete()
  async deletePlan(
    @Request() request: RequestContext,
    @Body() deletePlanDto: DeletePlanDto,
  ) {
    return await this.planService.deletePlan(request.user._id, deletePlanDto);
  }
}
