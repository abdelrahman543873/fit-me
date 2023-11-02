import { SetMetadata } from '@nestjs/common';

export const IS_USER_IN_ARRAY = 'isUserInArray';
export const IsUserInArray = (arrayProperty: string) =>
  SetMetadata(IS_USER_IN_ARRAY, arrayProperty);
