import { IErrorMessage } from '../interfaces/error-messages-interface';
export const LocalizedErrorMessages: IErrorMessage = {
  600: { EN: 'Unauthorized', AR: 'غير مصرح له' },
  601: {
    EN: 'incorrect phone number or password',
    AR: 'incorrect phone number or password',
  },
  602: { EN: 'auth token not provided', AR: 'auth token not provided' },
  603: { EN: 'incorrectly formatted token', AR: 'incorrectly formatted token' },
  604: {
    EN: 'only clients can use this feature',
    AR: 'only clients can use this feature',
  },
};
