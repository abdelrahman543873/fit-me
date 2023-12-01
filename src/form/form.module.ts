import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { FormRepository } from './form.repository';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Form, FormSchema } from './form.schema';
import { ExistingFormValidator } from './validators/existing-form.validator';
import { FormOwnerValidator } from './validators/form-owner.validator';
import { Question, QuestionSchema } from '../question/question.schema';
import { Model } from 'mongoose';
import { FollowUpFormValidator } from './validators/follow-up-form.validator';
import { FollowUpFormHasFollowUpValidator } from './validators/follow-up-form-has-follow-up.validator';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Question.name,
        useFactory: () => QuestionSchema,
      },
      {
        name: Form.name,
        useFactory: (questionSchema: Model<Question>) => {
          FormSchema.pre('deleteOne', async function () {
            const doc = await this.model.findOne(this.getFilter());
            await questionSchema.deleteOne({ form: doc._id });
          });
          return FormSchema;
        },
        inject: [getModelToken(Question.name)],
      },
    ]),
  ],
  providers: [
    FormService,
    FormRepository,
    ExistingFormValidator,
    FormOwnerValidator,
    FollowUpFormValidator,
    FollowUpFormHasFollowUpValidator,
  ],
  controllers: [FormController],
})
export class FormModule {}
