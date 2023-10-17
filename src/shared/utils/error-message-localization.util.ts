import { LocalizedErrorMessages } from '../constants/error-messages.constant';
import { LANGUAGE } from '../constants/lang.enum';

export const getLocalizedMessage = (statusCode: number, language: LANGUAGE) =>
  LocalizedErrorMessages[statusCode][language];
