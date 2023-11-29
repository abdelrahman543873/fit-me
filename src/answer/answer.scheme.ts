import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

export type AnswerDocument = HydratedDocument<Answer>;

@Schema({ versionKey: false, timestamps: true, strict: true })
export class Answer {
  @ApiProperty({ type: 'string' })
  _id?: ObjectId;

  @ApiProperty({ type: 'string' })
  @Prop({
    type: Types.ObjectId,
    ref: 'Question',
    required: true,
  })
  question: ObjectId;

  @ApiProperty({ type: 'string' })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  client: ObjectId;

  @Prop()
  text?: string;

  @Prop()
  media?: string;

  @Prop()
  choices?: string[];

  @Prop({
    type: Types.ObjectId,
    ref: 'FollowUp',
  })
  followUp?: ObjectId;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
