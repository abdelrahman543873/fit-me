import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

export type ClientDocument = HydratedDocument<Client>;

@Schema({ versionKey: false, timestamps: true, strict: true })
export class Client {
  @ApiProperty({ type: 'string' })
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  _id: ObjectId;

  @Prop()
  height?: number;

  @Prop()
  profession: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
