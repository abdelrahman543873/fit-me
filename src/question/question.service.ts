import { Injectable } from '@nestjs/common';
import { AddQuestionDto } from './inputs/add-question.dto';
import { QuestionRepository } from './question.repository';
import { UpdateQuestionDto } from './inputs/update-question.dto';
import { DeleteQuestionDto } from './inputs/delete-question.dto';
import { ObjectId } from 'mongoose';
import { SubmittedAnswerEvent } from '../answer/events/answered-question.event';
import { CompletedFormEvent } from '../form/events/form-completed.event';
import { FormEvents } from '../form/form.constants';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GetUnansweredQuestionsDto } from './inputs/get-unanswered-questions.dto';

@Injectable()
export class QuestionService {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  addQuestion(addQuestion: AddQuestionDto) {
    return this.questionRepository.addQuestion(addQuestion);
  }

  getUnansweredQuestions(
    getUnansweredQuestionsDto: GetUnansweredQuestionsDto,
    client: ObjectId,
  ) {
    return this.questionRepository.getUnansweredQuestions(
      getUnansweredQuestionsDto,
      client,
    );
  }

  async checkCompletedForm(submittedAnswerEvent: SubmittedAnswerEvent) {
    const unansweredQuestions = await this.getUnansweredQuestions(
      { form: submittedAnswerEvent.form },
      submittedAnswerEvent.client,
    );
    if (unansweredQuestions.length === 0) {
      const formCompletedEvent = new CompletedFormEvent();
      formCompletedEvent.client = submittedAnswerEvent.client;
      formCompletedEvent.trainer = submittedAnswerEvent.trainer;
      this.eventEmitter.emit(FormEvents.FORM_COMPLETED, formCompletedEvent);
    }
  }

  updateQuestion(updateQuestionDto: UpdateQuestionDto) {
    return this.questionRepository.updateQuestion(updateQuestionDto);
  }

  deleteQuestionDto(deleteQuestionDto: DeleteQuestionDto) {
    return this.questionRepository.deleteOne({ _id: deleteQuestionDto.id });
  }
}
