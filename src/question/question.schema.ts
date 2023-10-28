import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, ObjectId, Types } from 'mongoose';
import { QUESTION_TYPES } from './question.constants';

export type QuestionDocument = HydratedDocument<Question>;

@Schema({ versionKey: false, timestamps: true, strict: true })
export class Question {
  _id?: ObjectId;

  @ApiProperty({ type: 'string' })
  @Prop({
    type: Types.ObjectId,
    ref: 'Form',
    required: true,
  })
  form: ObjectId;

  @Prop()
  title: string;

  @Prop({ enum: QUESTION_TYPES })
  type: QUESTION_TYPES;

  @Prop({ type: [String] })
  choices: string[];
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
