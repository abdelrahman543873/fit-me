import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

export type SubscriptionDocument = HydratedDocument<Subscription>;

@Schema({ versionKey: false, timestamps: true, strict: true })
export class Subscription {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  client: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  trainer: ObjectId;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
