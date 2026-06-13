import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export interface ErrorDetail {
    field?: string;
    code: string;
    description: string;
}
export interface ErrorResponse {
    status: number;
    message: string;
    error: string;
    details: ErrorDetail[];
}
export declare class AppExceptionFilter implements ExceptionFilter {
    private readonly logger;
    catch(exception: unknown, host: ArgumentsHost): void;
    private handleAtelieNotFound;
    private handleEspecialidadeExistsException;
    private handleEquipadoExistsExcepiton;
    private handleAreaExistsException;
    private handleDataException;
    private handleMovelNotFound;
    private handleMovelCampoObrigatorio;
    private handleMovelDataInicioInvalida;
    private handleMovelHorasHomemInvalida;
    private handleMovelRestauradoInconsistente;
    private handleMovelEmProcessoHorasInvalida;
    private handleAtelieNaoEncontradoParaMovel;
    private handleMovelDataAnteriorFundacao;
    private handleMovelDuplicadoEmRestauracao;
    private handleHttpException;
    private handleUnknown;
    private resolveException;
}
