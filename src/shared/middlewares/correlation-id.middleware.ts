import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { getId } from 'express-correlation-id';
import { RequestContext } from '../interfaces/request-context.interface';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  use(req: RequestContext, res: Response, next: NextFunction) {
    req.id = getId();
    next();
  }
}
