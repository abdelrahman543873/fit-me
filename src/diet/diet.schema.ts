import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';
import { Macro, MarcoSchema } from '../meal/meal.schema';
import { ApiProperty } from '@nestjs/swagger';

export type DietDocument = HydratedDocument<Diet>;

@Schema({ versionKey: false, timestamps: true, strict: true })
export class Diet {
  @ApiProperty({ type: 'string' })
  _id?: ObjectId;

  @ApiProperty({ type: 'string' })
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  trainer: ObjectId;

  @Prop()
  title?: string;

  @Prop()
  notes?: string;

  @Prop({ type: [Types.ObjectId], required: true })
  meals: ObjectId[];

  @Prop({ type: [MarcoSchema] })
  macros?: Macro[];
}

export const DietSchema = SchemaFactory.createForClass(Diet);
