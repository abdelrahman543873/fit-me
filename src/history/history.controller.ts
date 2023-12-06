import { RequestContext } from './../shared/interfaces/request-context.interface';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HistoryService } from './history.service';
import { AddHistoryDto } from './inputs/add-history.dto';
import { Role } from '../shared/decorators/client.decorator';
import { USER_ROLE } from '../user/user.constants';
import { RoleGuard } from '../shared/guards/role.guard';
import { FilterHistoryDto } from './inputs/filter-history.dto';
import { ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('media'))
  @Role(USER_ROLE.CLIENT)
  @UseGuards(RoleGuard)
  async addHistory(
    @Request() request: RequestContext,
    @Body() addHistoryDto: AddHistoryDto,
    @UploadedFile() media?: Express.Multer.File,
  ) {
    return await this.historyService.addHistory(
      request.user._id,
      addHistoryDto,
      media,
    );
  }

  @Get('dates')
  async getHistoryDates(@Request() request: RequestContext) {
    return await this.historyService.getHistoryDates(request.user._id);
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
