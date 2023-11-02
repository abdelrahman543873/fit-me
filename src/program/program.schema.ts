import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

export type ProgramDocument = HydratedDocument<Program>;

@Schema({ versionKey: false, timestamps: true, strict: true })
export class Program {
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
  title: string;
}

export const ProgramSchema = SchemaFactory.createForClass(Program);
