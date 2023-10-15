import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

export type SubscriptionDocument = HydratedDocument<Subscription>;

@Schema({ versionKey: false, timestamps: true })
export class Subscription {
  @Prop({ type: Types.ObjectId, ref: 'Client', required: true })
  client: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Trainer', required: true })
  trainer: ObjectId;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
