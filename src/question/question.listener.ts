import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { QuestionService } from './question.service';
import { AnswerEvents } from '../answer/answer.constants';
import { SubmittedAnswerEvent } from '../answer/events/answered-question.event';

@Injectable()
export class QuestionListener {
  constructor(private readonly questionService: QuestionService) {}

  @OnEvent(AnswerEvents.ANSWER_SUBMITTED)
  async handleAnsweredQuestion(submittedAnswerEvent: SubmittedAnswerEvent) {
    await this.questionService.checkCompletedForm(submittedAnswerEvent);
  }
}
