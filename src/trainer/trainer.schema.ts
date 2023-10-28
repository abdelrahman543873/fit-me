import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

export type TrainerDocument = HydratedDocument<Trainer>;

@Schema({ versionKey: false, timestamps: true, strict: true })
export class Trainer {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  _id: ObjectId;
}

export const TrainerSchema = SchemaFactory.createForClass(Trainer);
