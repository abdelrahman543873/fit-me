import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

export type ProgramWorkoutDocument = HydratedDocument<ProgramWorkout>;

@Schema({ versionKey: false, timestamps: true, strict: true })
export class ProgramWorkout {
  @ApiProperty({ type: 'string' })
  _id?: ObjectId;

  @ApiProperty({ type: 'string' })
  @Prop({
    type: Types.ObjectId,
    ref: 'Program',
  })
  program: ObjectId;

  @ApiProperty({ type: 'string' })
  @Prop({
    type: Types.ObjectId,
    ref: 'Workout',
  })
  workout: ObjectId;
}

export const ProgramWorkoutSchema =
  SchemaFactory.createForClass(ProgramWorkout);
