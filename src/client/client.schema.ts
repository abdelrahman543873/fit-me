import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

export type ClientDocument = HydratedDocument<Client>;

@Schema({ versionKey: false, timestamps: true })
export class Client {
  _id?: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: ObjectId;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
