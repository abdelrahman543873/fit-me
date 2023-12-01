import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { USER_GENDER, USER_ROLE } from './user.constants';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false, timestamps: true, strict: true })
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

  @Prop({ required: true, enum: USER_ROLE, type: String })
  role: USER_ROLE;

  @Prop({ enum: USER_GENDER, type: String })
  gender: USER_GENDER;

  @Prop({ required: true })
  countryCode: string;

  token?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
