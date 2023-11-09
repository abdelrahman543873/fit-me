import { RequestContext } from './../shared/interfaces/request-context.interface';
import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FilterSubscriptionsDto } from './inputs/filter-subscriptions.dto';
import { ChoosePlanDto } from './inputs/choose-plan.dto';
import { Subscription } from './subscription.schema';

@ApiTags('subscription')
@ApiBearerAuth()
@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get('trainer')
  async getTrainer(@Request() request: RequestContext) {
    return await this.subscriptionService.getTrainer(request.user._id);
  }

  @Get('filter')
  async filterSubscriptions(
    @Request() request: RequestContext,
    @Query() filterSubscriptionsDto: FilterSubscriptionsDto,
  ) {
    return await this.subscriptionService.filterSubscriptions(
      request.user._id,
      filterSubscriptionsDto,
    );
  }

  @Get()
  async getClientSubscription(@Request() request: RequestContext) {
    return await this.subscriptionService.getClientSubscription(
      request.trainerId,
    );
  }

  @Put('plan')
  async choosePlan(
    @Request() request: RequestContext,
    @Body() choosePlanDto: ChoosePlanDto,
  ): Promise<Subscription> {
    return await this.subscriptionService.choosePlan({
      trainer: request.trainerId,
      client: request.user._id,
      plan: choosePlanDto.id,
    });
  }
}
