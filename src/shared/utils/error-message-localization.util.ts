import { LocalizedErrorMessages } from '../constants/error-messages.constant';
import { LANGUAGE } from '../constants/lang.enum';

export const getLocalizedMessage = (
  statusCode: number,
  language: LANGUAGE = LANGUAGE.EN,
) => LocalizedErrorMessages[statusCode][language];
