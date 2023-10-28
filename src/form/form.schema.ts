import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, ObjectId, Types } from 'mongoose';
import { FORM_TYPES } from './form.constants';

export type FormDocument = HydratedDocument<Form>;

@Schema({ versionKey: false, timestamps: true, strict: true })
export class Form {
  _id?: ObjectId;

  @ApiProperty({ type: 'string' })
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  trainer: ObjectId;

  @Prop()
  title: string;

  @Prop({ enum: FORM_TYPES })
  type: FORM_TYPES;

  @Prop({ default: false })
  isOptional: boolean;
}

export const FormSchema = SchemaFactory.createForClass(Form);
