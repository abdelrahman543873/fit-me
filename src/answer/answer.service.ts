import { Injectable } from '@nestjs/common';
import { AnswerRepository } from './answer.repository';
import { AddAnswerDto } from './inputs/add-answer.dto';

@Injectable()
export class AnswerService {
  constructor(private readonly answerRepository: AnswerRepository) {}

  addAnswer(addAnswerDto: AddAnswerDto, media: Express.Multer.File) {
    return this.answerRepository.addAnswer(addAnswerDto, media);
  }
}
