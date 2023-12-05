import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, ObjectId, Types } from 'mongoose';
import { HISTORY_TYPE } from './history.constants';

export type HistoryDocument = HydratedDocument<History>;

@Schema({ versionKey: false, timestamps: true, strict: true })
export class History {
  @ApiProperty({ type: 'string' })
  _id?: ObjectId;

  @ApiProperty({ type: 'string' })
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  client: ObjectId;

  @ApiProperty({ type: 'string' })
  @Prop({
    type: Types.ObjectId,
    ref: 'Exercise',
    required: true,
  })
  exercise: ObjectId;

  @Prop({ enum: HISTORY_TYPE, type: String, required: true })
  type: HISTORY_TYPE;

  @Prop({ required: true })
  value: number;

  @Prop()
  reps: number;

  @Prop()
  media: string;

  @Prop()
  comment: string;

  @Prop()
  measuredAt: Date;
}

export const HistorySchema = SchemaFactory.createForClass(History);
