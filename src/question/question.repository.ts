import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question, QuestionDocument } from './question.schema';
import { Model, ObjectId } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { AddQuestionDto } from './inputs/add-question.dto';
import { UpdateQuestionDto } from './inputs/update-question.dto';
import { DeleteQuestionDto } from './inputs/delete-question.dto';
import { GetUnansweredQuestionsDto } from './inputs/get-unanswered-questions.dto';

@Injectable()
export class QuestionRepository extends BaseRepository<Question> {
  constructor(
    @InjectModel(Question.name)
    private questionSchema: Model<QuestionDocument>,
  ) {
    super(questionSchema);
  }

  addQuestion(addQuestion: AddQuestionDto) {
    return this.questionSchema.create(addQuestion);
  }

  getUnansweredQuestions(
    getUnansweredQuestionsDto: GetUnansweredQuestionsDto,
    client: ObjectId,
  ) {
    return this.questionSchema.aggregate([
      {
        $match: {
          form: getUnansweredQuestionsDto.form,
        },
      },
      {
        $lookup: {
          from: 'answers',
          let: { questionId: '$_id' },
          as: 'answer',
          pipeline: [
            {
              $match: {
                ...(getUnansweredQuestionsDto.followUp && {
                  followUp: getUnansweredQuestionsDto.followUp,
                }),
                $expr: {
                  $eq: ['$$questionId', '$question'],
                },
                client,
              },
            },
          ],
        },
      },
      {
        $match: {
          answer: { $eq: [] },
        },
      },
      {
        $project: {
          answer: 0,
        },
      },
    ]);
  }

  updateQuestion(updateQuestionDto: UpdateQuestionDto) {
    return this.questionSchema.findOneAndUpdate(
      { _id: updateQuestionDto.id },
      { ...updateQuestionDto },
      { new: true },
    );
  }

  deleteQuestionDto(deleteQuestionDto: DeleteQuestionDto) {
    return this.questionSchema.deleteOne({ _id: deleteQuestionDto.id });
  }
}
