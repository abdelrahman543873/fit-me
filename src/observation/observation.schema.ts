import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, ObjectId, Types } from 'mongoose';
import { OBSERVATION_TYPE } from './observation.constants';

export type ObservationDocument = HydratedDocument<Observation>;

@Schema({ versionKey: false, timestamps: true, strict: true })
export class Observation {
  @ApiProperty({ type: 'string' })
  _id?: ObjectId;

  @ApiProperty({ type: 'string' })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  client: ObjectId;

  @ApiProperty({ type: 'string' })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  trainer: ObjectId;

  @Prop({ type: String, enum: OBSERVATION_TYPE })
  type: OBSERVATION_TYPE;

  @Prop({ type: String })
  note?: string;
}

export const ObservationSchema = SchemaFactory.createForClass(Observation);
