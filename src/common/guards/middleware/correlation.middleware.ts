import {
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

import { v4 as uuid } from 'uuid';

@Injectable()
export class CorrelationMiddleware
  implements NestMiddleware
{
  use(req: any, res: any, next: () => void) {
    req.correlationId = uuid();

    next();
  }
}