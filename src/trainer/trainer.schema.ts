import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

export type TrainerDocument = HydratedDocument<Trainer>;

@Schema({ versionKey: false, timestamps: true })
export class Trainer {
  _id?: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: ObjectId;
}

export const TrainerSchema = SchemaFactory.createForClass(Trainer);
