import { Body, Controller, Post, Put, UseInterceptors } from '@nestjs/common';
import { QuestionService } from './question.service';
import { AddQuestionDto } from './inputs/add-question.dto';
import { UpdateQuestionDto } from './inputs/update-questoin.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RequestInBodyInterceptor } from '../shared/interceptors/request-in-body.interceptor';

@ApiBearerAuth()
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @UseInterceptors(RequestInBodyInterceptor)
  async addQuestion(@Body() addQuestionDto: AddQuestionDto) {
    return await this.questionService.addQuestion(addQuestionDto);
  }

  @Put()
  @UseInterceptors(RequestInBodyInterceptor)
  async updateQuestion(@Body() updateQuestionDto: UpdateQuestionDto) {
    return await this.questionService.updateQuestion(updateQuestionDto);
  }
}
