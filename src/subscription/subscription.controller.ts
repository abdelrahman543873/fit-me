import { RequestContext } from './../shared/interfaces/request-context.interface';
import { Controller, Get } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { Request } from '@nestjs/common';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get('trainer')
  async getTrainer(@Request() request: RequestContext) {
    return await this.subscriptionService.getTrainer(request.user._id);
  }
}
