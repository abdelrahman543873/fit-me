import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, ObjectId, Types } from 'mongoose';
import { MEASUREMENT_TYPE } from '../measurement/measurement.constants';

export type FollowUpDocument = HydratedDocument<FollowUp>;

@Schema({ versionKey: false, timestamps: true, strict: true })
export class FollowUp {
  @ApiProperty({ type: 'string' })
  _id?: ObjectId;

  @ApiProperty({ type: 'string' })
  @Prop({
    type: Types.ObjectId,
    ref: 'ClientProgram',
  })
  clientProgram: ObjectId;

  @ApiProperty({ type: 'string' })
  @Prop({
    type: Types.ObjectId,
    ref: 'Form',
  })
  form?: ObjectId;

  @Prop({ type: String, enum: MEASUREMENT_TYPE })
  measurementType?: MEASUREMENT_TYPE;
}

export const FollowUpSchema = SchemaFactory.createForClass(FollowUp);
