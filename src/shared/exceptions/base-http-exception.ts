import { HttpException } from '@nestjs/common';

export class BaseHttpException extends HttpException {
  private static statusCode = 600;

  constructor(statusCode: number) {
    BaseHttpException.statusCode = statusCode;
    super('application error', BaseHttpException.statusCode);
  }
}
