import { Injectable } from '@nestjs/common';
import { AddQuestionDto } from './inputs/add-question.dto';
import { QuestionRepository } from './question.repository';
import { UpdateQuestionDto } from './inputs/update-question.dto';
import { DeleteQuestionDto } from './inputs/delete-question.dto';
import { ObjectId } from 'mongoose';

@Injectable()
export class QuestionService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  addQuestion(addQuestion: AddQuestionDto) {
    return this.questionRepository.addQuestion(addQuestion);
  }

  getUnansweredQuestions(form: ObjectId, client: ObjectId) {
    return this.questionRepository.getUnansweredQuestions(form, client);
  }

  updateQuestion(updateQuestionDto: UpdateQuestionDto) {
    return this.questionRepository.updateQuestion(updateQuestionDto);
  }

  deleteQuestionDto(deleteQuestionDto: DeleteQuestionDto) {
    return this.questionRepository.deleteOne({ _id: deleteQuestionDto.id });
  }
}
