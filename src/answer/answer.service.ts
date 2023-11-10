import { Injectable } from '@nestjs/common';
import { AnswerRepository } from './answer.repository';
import { AddAnswerDto } from './inputs/add-answer.dto';
import { ObjectId } from 'mongoose';

@Injectable()
export class AnswerService {
  constructor(private readonly answerRepository: AnswerRepository) {}

  addAnswer(
    client: ObjectId,
    addAnswerDto: AddAnswerDto,
    media: Express.Multer.File,
  ) {
    return this.answerRepository.addAnswer(client, addAnswerDto, media);
  }
}
