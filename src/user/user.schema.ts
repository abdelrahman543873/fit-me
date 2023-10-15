import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { USER_ROLE } from './user.constants';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false, timestamps: true })
export class User {
  _id?: ObjectId;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop()
  email?: string;

  @Prop()
  profilePicture?: string;

  @Prop({ required: true, enum: USER_ROLE })
  role: USER_ROLE;

  token?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
