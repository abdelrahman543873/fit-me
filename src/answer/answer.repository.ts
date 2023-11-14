import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Answer, AnswerDocument } from './answer.scheme';
import { Model, ObjectId } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { AddAnswerDto } from './inputs/add-answer.dto';
import { FilterAnswersDto } from './inputs/filter-answers.dto';

@Injectable()
export class AnswerRepository extends BaseRepository<Answer> {
  constructor(
    @InjectModel(Answer.name)
    private answerSchema: Model<AnswerDocument>,
  ) {
    super(answerSchema);
  }

  getAnswerQuestion(question: ObjectId, client: ObjectId) {
    return this.answerSchema.findOne({ question, client }).populate('question');
  }

  filterAnswers(trainer: ObjectId, filterAnswersDto: FilterAnswersDto) {
    return this.answerSchema.aggregate([
      {
        $match: {
          ...filterAnswersDto,
        },
      },
      {
        $lookup: {
          from: 'questions',
          let: { questionId: '$question' },
          as: 'question',
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$questionId', '$_id'],
                },
              },
            },
            {
              $lookup: {
                from: 'forms',
                localField: 'form',
                foreignField: '_id',
                as: 'form',
              },
            },
            { $unwind: '$form' },
          ],
        },
      },
      { $unwind: '$question' },
      {
        $match: {
          $expr: {
            $eq: ['$question.form.trainer', trainer],
          },
        },
      },
    ]);
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
