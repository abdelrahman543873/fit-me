import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

export type TrainerDocument = HydratedDocument<Trainer>;

@Schema({ versionKey: false, timestamps: true, strict: true })
export class Trainer {
  @ApiProperty({ type: 'string' })
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  _id: ObjectId;

  @Prop()
  facebook?: string;

  @Prop()
  instagram?: string;

  @Prop()
  twitter?: string;

  @Prop()
  tiktok?: string;
}

export const TrainerSchema = SchemaFactory.createForClass(Trainer);
