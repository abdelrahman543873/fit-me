import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

export type SubscriptionDocument = HydratedDocument<Subscription>;

@Schema({ versionKey: false, timestamps: true, strict: true })
export class Subscription {
  @ApiProperty({ type: 'string' })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  client: ObjectId;

  @ApiProperty({ type: 'string' })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  trainer: ObjectId;

  @Prop({ required: true, default: false })
  accepted: boolean;

  @ApiProperty({ type: 'string' })
  @Prop({ type: Types.ObjectId, ref: 'Plan' })
  plan: ObjectId;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
