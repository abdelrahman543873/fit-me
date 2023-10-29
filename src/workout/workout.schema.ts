import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

export type WorkoutDocument = HydratedDocument<Workout>;

@Schema({ versionKey: false, timestamps: true, strict: true })
export class Workout {
  @ApiProperty({ type: 'string' })
  _id: ObjectId;

  @ApiProperty({ type: 'string' })
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  trainer: ObjectId;

  @Prop()
  title: string;
}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);
