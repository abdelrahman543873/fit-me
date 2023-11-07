import { RequestContext } from './../shared/interfaces/request-context.interface';
import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FilterSubscriptionsDto } from './inputs/filter-subscriptions.dto';
import { MongoIdDto } from '../shared/inputs/mongo-id.dto';
import { UpdateSubscriptionDto } from './inputs/update-subscription.dto';

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

  @Put(':id')
  async updateSubscription(
    @Request() request: RequestContext,
    @Param() subscriptionId: MongoIdDto,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    return await this.subscriptionService.updateSubscription(
      request.trainerId || request.user._id,
      subscriptionId,
      updateSubscriptionDto,
    );
  }
}
