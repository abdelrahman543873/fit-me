import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, ObjectId, Types } from 'mongoose';
import { MEASUREMENT_TYPE } from '../measurement/measurement.constants';
import { FOLLOW_UP_STATUS } from './follow-up.constants';

export type FollowUpDocument = HydratedDocument<FollowUp>;

@Schema({ versionKey: false, timestamps: true, strict: true })
export class FollowUp {
  @ApiProperty({ type: 'string' })
  _id?: ObjectId;

  @ApiProperty({ type: 'string' })
  @Prop({
    type: Types.ObjectId,
    ref: 'Form',
  })
  form?: ObjectId;

  @Prop({ type: String, enum: MEASUREMENT_TYPE })
  measurementType?: MEASUREMENT_TYPE;

  @ApiProperty({ type: 'string' })
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  client: ObjectId;

  @ApiProperty({ type: 'string' })
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  trainer: ObjectId;

  @Prop({ type: String, enum: FOLLOW_UP_STATUS })
  status: FOLLOW_UP_STATUS;
}

export const FollowUpSchema = SchemaFactory.createForClass(FollowUp);
