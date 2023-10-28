import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';
import { MUSCLE_GROUP } from './exercise.constants';
import { ApiProperty } from '@nestjs/swagger';

export type ExerciseDocument = HydratedDocument<Exercise>;

@Schema({ versionKey: false, timestamps: true })
export class Exercise {
  _id?: ObjectId;

  @Prop()
  title: string;

  @ApiProperty({ type: 'string' })
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  trainer: ObjectId;

  @Prop({ enum: MUSCLE_GROUP })
  muscleGroup: MUSCLE_GROUP;

  @Prop({ type: [String] })
  media?: string[];

  @Prop({ type: [String] })
  links?: string[];

  @Prop()
  instructions?: string;
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
