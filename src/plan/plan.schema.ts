import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';
import { FOLLOW_UP_FREQUENCY, PLAN_TYPE } from './plan.constants';
import { ApiProperty } from '@nestjs/swagger';

export type PlanDocument = HydratedDocument<Plan>;

@Schema({ versionKey: false, timestamps: true })
export class Plan {
  @ApiProperty({ type: 'string' })
  _id?: ObjectId;

  @ApiProperty({ type: 'string' })
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  trainerId: ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, enum: PLAN_TYPE })
  type: PLAN_TYPE;

  @Prop({ required: true })
  monthsDuration: number;

  @Prop({ required: true, enum: FOLLOW_UP_FREQUENCY })
  followUpFrequency: FOLLOW_UP_FREQUENCY;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  currency: string;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
