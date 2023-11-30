import { RequestContext } from './../shared/interfaces/request-context.interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { AddQuestionDto } from './inputs/add-question.dto';
import { UpdateQuestionDto } from './inputs/update-question.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestInBodyInterceptor } from '../shared/interceptors/request-in-body.interceptor';
import { DeleteQuestionDto } from './inputs/delete-question.dto';
import { GetUnansweredQuestionsDto } from './inputs/get-unanswered-questions.dto';
import { Question } from './question.schema';

@ApiTags('question')
@ApiBearerAuth()
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @UseInterceptors(RequestInBodyInterceptor)
  async addQuestion(@Body() addQuestionDto: AddQuestionDto) {
    return await this.questionService.addQuestion(addQuestionDto);
  }

  @Get('unanswered/:form')
  async getUnansweredQuestions(
    @Param() getUnansweredQuestionsDto: GetUnansweredQuestionsDto,
    @Request() request: RequestContext,
  ): Promise<Question[]> {
    return await this.questionService.getUnansweredQuestions(
      getUnansweredQuestionsDto,
      request.user._id,
    );
  }

  @Put()
  @UseInterceptors(RequestInBodyInterceptor)
  async updateQuestion(@Body() updateQuestionDto: UpdateQuestionDto) {
    return await this.questionService.updateQuestion(updateQuestionDto);
  }

  @Delete()
  @UseInterceptors(RequestInBodyInterceptor)
  async deleteQuestion(@Body() deleteQuestionDto: DeleteQuestionDto) {
    return await this.questionService.deleteQuestionDto(deleteQuestionDto);
  }
}
