import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Answer, AnswerDocument } from './answer.scheme';
import { Model, ObjectId } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { AddAnswerDto } from './inputs/add-answer.dto';

@Injectable()
export class AnswerRepository extends BaseRepository<Answer> {
  constructor(
    @InjectModel(Answer.name)
    private answerSchema: Model<AnswerDocument>,
  ) {
    super(answerSchema);
  }

  addAnswer(
    client: ObjectId,
    addAnswerDto: AddAnswerDto,
    media: Express.Multer.File,
  ) {
    return this.answerSchema.create({
      client,
      ...addAnswerDto,
      ...(media && {
        media: `${process.env.HOST}${media.filename}`,
      }),
    });
  }
}
