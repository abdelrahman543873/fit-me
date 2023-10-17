import { Request } from 'express';
import { LANGUAGE } from '../constants/lang.enum';
export interface RequestContext extends Request {
  lang: LANGUAGE | string;
}
