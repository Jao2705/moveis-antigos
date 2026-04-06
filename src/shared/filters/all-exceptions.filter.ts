import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        ctx.getRequest<Request>();

        const statusCode = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        let message = "Erro interno do servidor";

        if (exception instanceof HttpException) {
            const exceptionResponse = exception.getResponse();

            if (typeof exceptionResponse === "string") {
                message = exceptionResponse;
            } else if (
                typeof exceptionResponse === "object" &&
                exceptionResponse !== null &&
                "message" in exceptionResponse
            ) {
                const maybeMessage = (exceptionResponse as { message?: string | string[] }).message;
                message = Array.isArray(maybeMessage) ? maybeMessage.join("; ") : (maybeMessage ?? message);
            } else {
                message = exception.message;
            }
        } else if (exception instanceof Error) {
            message = exception.message;
        }

        response.status(statusCode).json({
            statusCode,
            message,
            timestamp: new Date().toISOString(),
        });
    }
}
