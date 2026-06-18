import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export interface StandardErrorResponse {
    statusCode: number;
    message: string;
    timestamp: string;
    errors?: Record<string, string>;
}
export declare class AppExceptionFilter implements ExceptionFilter {
    private readonly logger;
    catch(exception: unknown, host: ArgumentsHost): void;
    private buildResponse;
    private handleValidationException;
    private handleHttpException;
    private resolveException;
}
