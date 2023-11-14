import { Injectable } from '@nestjs/common';
import { AnswerRepository } from './answer.repository';
import { AddAnswerDto } from './inputs/add-answer.dto';
import { ObjectId } from 'mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SubmittedAnswerEvent } from './events/answered-question.event';
import { AnswerEvents } from './answer.constants';
import { FilterAnswersDto } from './inputs/filter-answers.dto';

@Injectable()
export class AnswerService {
  constructor(
    private readonly answerRepository: AnswerRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async addAnswer(
    client: ObjectId,
    addAnswerDto: AddAnswerDto,
    media: Express.Multer.File,
    trainer: ObjectId,
  ) {
    const answer = await this.answerRepository.addAnswer(
      client,
      addAnswerDto,
      media,
    );
    const answerPopulatedQuestion =
      await this.answerRepository.getAnswerQuestion(
        addAnswerDto.question,
        client,
      );
    const submittedAnswerEvent = new SubmittedAnswerEvent();
    submittedAnswerEvent.client = client;
    submittedAnswerEvent.form = answerPopulatedQuestion.question['form'];
    submittedAnswerEvent.trainer = trainer;
    this.eventEmitter.emit(AnswerEvents.ANSWER_SUBMITTED, submittedAnswerEvent);
    return answer;
  }

  filterAnswers(trainer: ObjectId, filterAnswersDto: FilterAnswersDto) {
    return this.answerRepository.filterAnswers(trainer, filterAnswersDto);
  }
}
