/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/indent */
import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';
import winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new DailyRotateFile({
        filename: 'logs/%DATE%-error.log',
        datePattern: 'YYYY-MM-DD',
        maxSize: '20m',
        maxFiles: '14d',
        level: 'error', // Ghi lỗi vào file này
      }),
      new winston.transports.Console({
        format: winston.format.simple(),
      }),
    ],
  });

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const { statusCode } = res;
      this.logger.info(`Request to ${req.originalUrl} resulted in ${statusCode}`);
    });

    res.on('error', (err) => {
      this.logger.error(`Request to ${req.originalUrl} resulted in an error: ${err.message}`);
    });

    next();
  }
}
