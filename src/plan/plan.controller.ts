import { Body, Controller, Post, Request } from '@nestjs/common';
import { PlanService } from './plan.service';
import { AddPlanDto } from './inputs/add-plan.dto';
import { RequestContext } from '../shared/interfaces/request-context.interface';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Plan } from './plan.schema';

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
}
