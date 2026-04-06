import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from "@nestjs/common";
import { Response, Request } from "express";
import { AreaExistsException } from "src/atelie/domain/area.exception";
import { AtelieNotFoundException } from "src/atelie/domain/atelie.not.found.exception";
import { DataException } from "src/atelie/domain/data.exception";
import { EquipadoExistsExcepiton } from "src/atelie/domain/equipado.exception";
import { EspecialidadeExistsException } from "src/atelie/domain/especiladade-exists.exception";

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



@Catch()
export class AppExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(AppExceptionFilter.name);

    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const errorResponse = this.resolveException(exception);

        this.logger.error(
            `${request.method} ${request.url} -> ${errorResponse.status}`,
            exception instanceof Error ? exception.stack : String(exception),
        );

        response.status(errorResponse.status).json(errorResponse);
    }

    private handleAtelieNotFound(exception: AtelieNotFoundException): ErrorResponse {
        return {
            status: HttpStatus.NOT_FOUND,
            message: 'Ateliê não encontrado.',
            error: 'ATELIE_NOT_FOUND',
            details: [
                {
                    field: 'id',
                    code: 'ATELIE_NOT_FOUND',
                    description: exception.message
                }
            ]
        }
    }

    private handleEspecialidadeExistsException(exception: EspecialidadeExistsException): ErrorResponse {
        const msg =
            typeof exception.getResponse === 'string' ? (exception.getResponse() as string) : exception.message;

        return {
            status: HttpStatus.BAD_REQUEST,
            message: 'Especialidade inválida ou excede o limite de caracteres',
            error: 'ESPECIALIDADE_EXISTS',
            details: [
                {
                    field: 'especialidadeEra',
                    code: 'ESPECIALIDADE_EXISTS',
                    description: msg
                }
            ]
        }
    }

    private handleEquipadoExistsExcepiton(exception: EquipadoExistsExcepiton): ErrorResponse {
        const msg = typeof exception.getResponse === 'function' && typeof exception.getResponse() === 'string'
            ? (exception.getResponse() as string)
            : exception.message;

        return {
            status: HttpStatus.BAD_REQUEST,
            message: 'O campo equipado é obrigatório e deve ser um valor booleano',
            error: 'EQUIPADO_INVALIDO',
            details: [
                {
                    field: 'equipadoCompleto',
                    code: 'EQUIPADO_INVALIDO',
                    description: msg
                }
            ]
        };
    }

    private handleAreaExistsException(exception: AreaExistsException): ErrorResponse {
        const msg = typeof exception.getResponse === 'function' && typeof exception.getResponse() === 'string'
            ? (exception.getResponse() as string)
            : exception.message;

        return {
            status: HttpStatus.BAD_REQUEST,
            message: 'A área da oficina deve ser maior ou igual a 50m²',
            error: 'AREA_INVALIDA',
            details: [
                {
                    field: 'areaOficinaM2',
                    code: 'AREA_INVALIDA',
                    description: msg
                }
            ]
        };
    }

    private handleDataException(exception: DataException): ErrorResponse {
        const msg = typeof exception.getResponse === 'function' && typeof exception.getResponse() === 'string'
            ? (exception.getResponse() as string)
            : exception.message;

        return {
            status: HttpStatus.BAD_REQUEST,
            message: 'A data de fundação é inválida',
            error: 'DATA_INVALIDA',
            details: [
                {
                    field: 'dataFundacao',
                    code: 'DATA_INVALIDA',
                    description: msg
                }
            ]
        };
    }

    private handleUnknown(exception: unknown): ErrorResponse {
        const msg = exception instanceof Error ? exception.message : 'Erro interno no servidor';

        return {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Erro interno no servidor',
            error: 'INTERNAL_SERVER_ERROR',
            details: [
                {
                    code: 'INTERNAL_SERVER_ERROR',
                    description: msg,
                }
            ]
        };
    }


    private resolveException(exception: unknown): ErrorResponse {
        if (exception instanceof AtelieNotFoundException) {
            return this.handleAtelieNotFound(exception);
        }

        if (exception instanceof EspecialidadeExistsException) {
            return this.handleEspecialidadeExistsException(exception);
        }

        if (exception instanceof EquipadoExistsExcepiton) {
            return this.handleEquipadoExistsExcepiton(exception);
        }

        if (exception instanceof AreaExistsException) {
            return this.handleAreaExistsException(exception);
        }

        if (exception instanceof DataException) {
            return this.handleDataException(exception);
        }

        return this.handleUnknown(exception);
    }
}
