import { Body, Controller, Post, Request } from '@nestjs/common';
import { PlanService } from './plan.service';
import { AddPlanDto } from './inputs/add-plan.dto';
import { RequestContext } from '../shared/interfaces/request-context.interface';

@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  async addPlan(
    @Request() request: RequestContext,
    @Body() addPlanDto: AddPlanDto,
  ) {
    return await this.planService.addPlan(request.user._id, addPlanDto);
  }
}
