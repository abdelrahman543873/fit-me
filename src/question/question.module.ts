import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { QuestionRepository } from './question.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema } from './question.schema';
import { ExistingQuestionValidator } from './validators/existing-question.validator';
import { QuestionOwnerValidator } from './validators/question-owner.validator';
import { QuestionListener } from './question.listener';
import { FollowUpQuestionHasFollowUpValidator } from './validators/follow-up-question-has-follow-up.validator';
import { FormHasQuestionsValidator } from './validators/form-has-questions.validator';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
    ]),
  ],
  providers: [
    QuestionService,
    QuestionRepository,
    ExistingQuestionValidator,
    QuestionOwnerValidator,
    QuestionListener,
    FollowUpQuestionHasFollowUpValidator,
    FormHasQuestionsValidator,
  ],
  controllers: [QuestionController],
})
export class QuestionModule {}
