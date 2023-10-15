import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

export type TrainerDocument = HydratedDocument<Trainer>;

@Schema({ versionKey: false, timestamps: true, _id: false })
export class Trainer {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: ObjectId;
}

export const TrainerSchema = SchemaFactory.createForClass(Trainer);
