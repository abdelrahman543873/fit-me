import { RequestContext } from './../shared/interfaces/request-context.interface';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AddAnswerDto } from './inputs/add-answer.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilterAnswersDto } from './inputs/filter-answers.dto';
import { RequestInBodyInterceptor } from '../shared/interceptors/request-in-body.interceptor';

@ApiBearerAuth()
@ApiTags('answer')
@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Get('filter')
  @UseInterceptors(RequestInBodyInterceptor)
  async filterAnswers(
    @Request() request: RequestContext,
    @Query() filterAnswersDto: FilterAnswersDto,
  ) {
    return await this.answerService.filterAnswers(
      request.user._id,
      filterAnswersDto,
    );
  }

  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(FileInterceptor('media'))
  async addAnswer(
    @Request() request: RequestContext,
    @Body() addAnswerDto: AddAnswerDto,
    @UploadedFile() media?: Express.Multer.File,
  ) {
    return await this.answerService.addAnswer(
      request.user._id,
      addAnswerDto,
      media,
      request.trainerId,
    );
  }
}
