import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, ObjectId, Types } from 'mongoose';
import { MEASUREMENT_TYPE } from './measurement.constants';

export type MeasurementDocument = HydratedDocument<Measurement>;

@Schema({ versionKey: false, timestamps: true, strict: true })
export class Measurement {
  @ApiProperty({ type: 'string' })
  _id?: ObjectId;

  @ApiProperty({ type: 'string' })
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  client: ObjectId;

  @Prop({ enum: MEASUREMENT_TYPE })
  type: string;

  @Prop()
  value: number;

  @Prop()
  media: string;

  @Prop()
  measuredAt: Date;

  @Prop()
  unit: string;
}

export const MeasurementSchema = SchemaFactory.createForClass(Measurement);
