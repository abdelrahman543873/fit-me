import { RequestContext } from './../shared/interfaces/request-context.interface';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { HistoryService } from './history.service';
import { AddHistoryDto } from './inputs/add-history.schema';
import { Role } from '../shared/decorators/client.decorator';
import { USER_ROLE } from '../user/user.constants';
import { RoleGuard } from '../shared/guards/role.guard';
import { FilterHistoryDto } from './inputs/filter-history.schema';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  @Role(USER_ROLE.CLIENT)
  @UseGuards(RoleGuard)
  async addHistory(
    @Request() request: RequestContext,
    @Body() addHistoryDto: AddHistoryDto,
  ) {
    return await this.historyService.addHistory(
      request.user._id,
      addHistoryDto,
    );
  }

  @Get('filter')
  async filterHistory(
    @Request() request: RequestContext,
    @Query() filterHistoryDto: FilterHistoryDto,
  ) {
    return await this.historyService.filterHistory(
      request.user._id,
      filterHistoryDto,
    );
  }
}
