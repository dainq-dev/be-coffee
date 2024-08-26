/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */
import { MSG } from '@core/messages/common';
import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

    catch(exception: any, host: ArgumentsHost) {
        console.log('Error:: ', exception);
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

        if (exception?.code === 'validation') {
            if (
                typeof exception['message'] === 'object' &&
                exception['message'] &&
                Array.isArray(exception['message']) &&
                exception['message']?.length
            ) {
                httpStatus = HttpStatus.BAD_REQUEST;
                const errorResponse = {
                    status: false,
                    key: MSG.VALIDATION.key,
                    message: exception['message'][0],
                };
                return httpAdapter.reply(ctx.getResponse(), errorResponse, httpStatus);
            }
        }

        if (exception instanceof HttpException) {
            httpStatus = exception.getStatus();
            const response = exception.getResponse();
            const statusCode = exception.getStatus();

            const message =
                typeof response === 'string' ? response : (response as any).message;
            const key =
                typeof response === 'string' ? response : (response as any).key;

            const errorResponse = {
                status: false,
                key,
                message,
            };

            if (statusCode === 403) {
                errorResponse.key = MSG.FORBIDDEN.key;
                errorResponse.message = MSG.FORBIDDEN.message;
            }

            return httpAdapter.reply(ctx.getResponse(), errorResponse, httpStatus);
        }

        const errorResponse = {
            status: false,
            key: MSG.INTERNAL_SERVER_ERROR.key,
            message: MSG.INTERNAL_SERVER_ERROR.message,
        };
        return httpAdapter.reply(ctx.getResponse(), errorResponse, httpStatus);
    }
}
