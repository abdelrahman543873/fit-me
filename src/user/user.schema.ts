import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { USER_ROLE } from './user.constants';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false, timestamps: true })
export class User {
  @ApiProperty({ type: 'string' })
  _id?: ObjectId;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  phoneNumber: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ sparse: true, lowercase: true })
  email?: string;

  @Prop()
  profilePicture?: string;

  @Prop({ required: true, enum: USER_ROLE })
  role: USER_ROLE;

  @Prop({ required: true })
  countryCode: string;

  token?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
