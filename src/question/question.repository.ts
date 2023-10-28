import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question, QuestionDocument } from './question.schema';
import { Model } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { AddQuestionDto } from './inputs/add-question.dto';
import { UpdateQuestionDto } from './inputs/update-questoin.dto';
import { DeleteQuestionDto } from './inputs/delete-question.dto';

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
