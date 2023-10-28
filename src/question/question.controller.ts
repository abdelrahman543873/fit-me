import { Body, Controller, Post } from '@nestjs/common';
import { QuestionService } from './question.service';
import { AddQuestionDto } from './inputs/add-question.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  async addQuestion(@Body() addQuestionDto: AddQuestionDto) {
    return await this.questionService.addQuestion(addQuestionDto);
  }
}
