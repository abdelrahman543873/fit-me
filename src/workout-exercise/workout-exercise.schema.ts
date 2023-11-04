import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, ObjectId, Types } from 'mongoose';
import { WORKOUT_STAGE } from './workout-exercise.constants';

export type WorkoutExerciseDocument = HydratedDocument<WorkoutExercise>;

@Schema({ versionKey: false, timestamps: true, strict: true })
export class WorkoutExercise {
  @ApiProperty({ type: 'string' })
  _id?: ObjectId;

  @ApiProperty({ type: 'string' })
  @Prop({
    type: Types.ObjectId,
    ref: 'Exercise',
  })
  exercise: ObjectId;

  @ApiProperty({ type: 'string' })
  @Prop({
    type: Types.ObjectId,
    ref: 'Workout',
  })
  workout: ObjectId;

  @Prop({ enum: WORKOUT_STAGE })
  stage: WORKOUT_STAGE;

  @Prop()
  minsDuration?: number;

  @Prop({ type: [Number] })
  sets?: number[];
}

export const WorkoutExerciseSchema =
  SchemaFactory.createForClass(WorkoutExercise);
