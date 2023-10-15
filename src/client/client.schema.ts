import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

export type ClientDocument = HydratedDocument<Client>;

@Schema({ versionKey: false, timestamps: true, _id: false })
export class Client {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  _id: ObjectId;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
