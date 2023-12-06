import { RequestContext } from './../shared/interfaces/request-context.interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Put } from '@nestjs/common';
import { MongoIdDto } from '../shared/inputs/mongo-id.dto';
import { UpdateHistoryDto } from './inputs/update-history.dto';
import { GetHistoryDatesDto } from './inputs/get-history-dates.dto';

@ApiBearerAuth()
@ApiTags('history')
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

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('media'))
  @Role(USER_ROLE.CLIENT)
  @UseGuards(RoleGuard)
  async updateHistory(
    @Request() request: RequestContext,
    @Body() addHistoryDto: UpdateHistoryDto,
    @Param() mongoIdDto: MongoIdDto,
    @UploadedFile() media?: Express.Multer.File,
  ) {
    return await this.historyService.updateHistory(
      request.user._id,
      addHistoryDto,
      mongoIdDto.id,
      media,
    );
  }

  @Delete(':id')
  @Role(USER_ROLE.CLIENT)
  @UseGuards(RoleGuard)
  async deleteHistory(
    @Request() request: RequestContext,
    @Param() mongoIdDto: MongoIdDto,
  ) {
    return await this.historyService.deleteHistory(
      request.user._id,
      mongoIdDto.id,
    );
  }

  @Get('dates')
  async getHistoryDates(
    @Request() request: RequestContext,
    @Query() getHistoryDatesDto: GetHistoryDatesDto,
  ) {
    return await this.historyService.getHistoryDates(
      request.user._id,
      getHistoryDatesDto,
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
