import { RequestContext } from './../shared/interfaces/request-context.interface';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AddFollowUpDto } from './inputs/add-follow-up.dto';
import { FollowUpService } from './follow-up.service';
import { RoleGuard } from '../shared/guards/role.guard';
import { USER_ROLE } from '../user/user.constants';
import { Role } from '../shared/decorators/client.decorator';
import { RequestInBodyInterceptor } from '../shared/interceptors/request-in-body.interceptor';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FilterFollowUpsDto } from './inputs/filter-follow-ups.dto';
import { CompleteFollowUpsDto } from './inputs/complete-follow-up.dto';

@ApiBearerAuth()
@ApiTags('follow-up')
@Controller('follow-up')
export class FollowUpController {
  constructor(private readonly followUpService: FollowUpService) {}

  @Post()
  @Role(USER_ROLE.TRAINER)
  @UseGuards(RoleGuard)
  @UseInterceptors(RequestInBodyInterceptor)
  async addFollowUp(
    @Request() request: RequestContext,
    @Body() addFollowUpDto: AddFollowUpDto,
  ) {
    return await this.followUpService.addFollowUp(
      request.user._id,
      addFollowUpDto,
    );
  }

  @Get()
  async filterFollowUps(
    @Request() request: RequestContext,
    @Query() filterFollowUps: FilterFollowUpsDto,
  ) {
    return await this.followUpService.filterFollowUps(
      request.user,
      filterFollowUps,
    );
  }

  @Put('complete/:id')
  @Role(USER_ROLE.TRAINER)
  @UseGuards(RoleGuard)
  @UseInterceptors(RequestInBodyInterceptor)
  async completeFollowUp(@Param() completeFollowUpsDto: CompleteFollowUpsDto) {
    return await this.followUpService.completeFollowUp(completeFollowUpsDto.id);
  }
}
