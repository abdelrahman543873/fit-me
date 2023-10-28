import { Body, Controller, Post, Put } from '@nestjs/common';
import { QuestionService } from './question.service';
import { AddQuestionDto } from './inputs/add-question.dto';
import { UpdateQuestionDto } from './inputs/update-questoin.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  async addQuestion(@Body() addQuestionDto: AddQuestionDto) {
    return await this.questionService.addQuestion(addQuestionDto);
  }

  @Put()
  async updateQuestion(@Body() updateQuestionDto: UpdateQuestionDto) {
    return await this.questionService.updateQuestion(updateQuestionDto);
  }
}
