import { Request } from 'express';
import { LANGUAGE } from '../constants/lang.enum';
import { User } from 'src/user/user.schema';
import { ObjectId } from 'mongoose';
export interface RequestContext extends Request {
  lang: LANGUAGE | string;
  user: User;
  trainerId: ObjectId | null;
  id: string;
}
