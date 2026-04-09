import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { Response, Request } from "express";
import { AreaExistsException } from "src/atelie/domain/area.exception";
import { AtelieNotFoundException } from "src/atelie/domain/atelie.not.found.exception";
import { DataException } from "src/atelie/domain/data.exception";
import { EquipadoExistsExcepiton } from "src/atelie/domain/equipado.exception";
import { EspecialidadeExistsException } from "src/atelie/domain/especiladade-exists.exception";
import {
    AtelieNaoEncontradoParaMovelException,
    MovelCampoObrigatorioException,
    MovelDataAnteriorFundacaoException,
    MovelDataInicioInvalidaException,
    MovelDuplicadoEmRestauracaoException,
    MovelEmProcessoHorasInvalidaException,
    MovelHorasHomemInvalidaException,
    MovelNotFoundException,
    MovelRestauradoInconsistenteException,
} from "src/movel/domain/movel.exceptions";

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
            typeof exception.getResponse === 'string' ? (exception.getResponse as string) : exception.message;

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

    private handleMovelNotFound(exception: MovelNotFoundException): ErrorResponse {
        return {
            status: HttpStatus.NOT_FOUND,
            message: 'Móvel não encontrado.',
            error: 'MOVEL_NOT_FOUND',
            details: [
                {
                    field: 'id',
                    code: 'MOVEL_NOT_FOUND',
                    description: exception.message,
                }
            ]
        };
    }

    private handleMovelCampoObrigatorio(exception: MovelCampoObrigatorioException): ErrorResponse {
        return {
            status: HttpStatus.BAD_REQUEST,
            message: 'Campo obrigatório não informado.',
            error: 'MOVEL_CAMPO_OBRIGATORIO',
            details: [
                {
                    code: 'MOVEL_CAMPO_OBRIGATORIO',
                    description: exception.message,
                }
            ]
        };
    }

    private handleMovelDataInicioInvalida(exception: MovelDataInicioInvalidaException): ErrorResponse {
        return {
            status: HttpStatus.BAD_REQUEST,
            message: 'Data de início do trabalho inválida.',
            error: 'MOVEL_DATA_INICIO_INVALIDA',
            details: [
                {
                    field: 'dataInicioTrab',
                    code: 'MOVEL_DATA_INICIO_INVALIDA',
                    description: exception.message,
                }
            ]
        };
    }

    private handleMovelHorasHomemInvalida(exception: MovelHorasHomemInvalidaException): ErrorResponse {
        return {
            status: HttpStatus.BAD_REQUEST,
            message: 'Quantidade de horas-homem inválida.',
            error: 'MOVEL_HORAS_HOMEM_INVALIDA',
            details: [
                {
                    field: 'horasHomem',
                    code: 'MOVEL_HORAS_HOMEM_INVALIDA',
                    description: exception.message,
                }
            ]
        };
    }

    private handleMovelRestauradoInconsistente(exception: MovelRestauradoInconsistenteException): ErrorResponse {
        return {
            status: HttpStatus.BAD_REQUEST,
            message: 'Inconsistência entre restaurado e horas-homem.',
            error: 'MOVEL_RESTAURADO_INCONSISTENTE',
            details: [
                {
                    field: 'restaurado',
                    code: 'MOVEL_RESTAURADO_INCONSISTENTE',
                    description: exception.message,
                }
            ]
        };
    }

    private handleMovelEmProcessoHorasInvalida(exception: MovelEmProcessoHorasInvalidaException): ErrorResponse {
        return {
            status: HttpStatus.BAD_REQUEST,
            message: 'Horas-homem inválidas para móvel em processo de restauração.',
            error: 'MOVEL_EM_PROCESSO_HORAS_INVALIDA',
            details: [
                {
                    field: 'horasHomem',
                    code: 'MOVEL_EM_PROCESSO_HORAS_INVALIDA',
                    description: exception.message,
                }
            ]
        };
    }

    private handleAtelieNaoEncontradoParaMovel(exception: AtelieNaoEncontradoParaMovelException): ErrorResponse {
        return {
            status: HttpStatus.NOT_FOUND,
            message: 'Ateliê não encontrado para o móvel informado.',
            error: 'ATELIE_NAO_ENCONTRADO_PARA_MOVEL',
            details: [
                {
                    field: 'atelieId',
                    code: 'ATELIE_NAO_ENCONTRADO_PARA_MOVEL',
                    description: exception.message,
                }
            ]
        };
    }

    private handleMovelDataAnteriorFundacao(exception: MovelDataAnteriorFundacaoException): ErrorResponse {
        return {
            status: HttpStatus.BAD_REQUEST,
            message: 'A data de início do trabalho não pode ser anterior à data de fundação do ateliê.',
            error: 'MOVEL_DATA_ANTERIOR_FUNDACAO',
            details: [
                {
                    field: 'dataInicioTrab',
                    code: 'MOVEL_DATA_ANTERIOR_FUNDACAO',
                    description: exception.message,
                }
            ]
        };
    }

    private handleMovelDuplicadoEmRestauracao(exception: MovelDuplicadoEmRestauracaoException): ErrorResponse {
        return {
            status: HttpStatus.CONFLICT,
            message: 'Já existe um móvel desse tipo em restauração para este ateliê.',
            error: 'MOVEL_DUPLICADO_EM_RESTAURACAO',
            details: [
                {
                    code: 'MOVEL_DUPLICADO_EM_RESTAURACAO',
                    description: exception.message,
                }
            ]
        };
    }

    private handleHttpException(exception: HttpException): ErrorResponse {
        const status = exception.getStatus();
        const response = exception.getResponse() as any;
        const message = typeof response === 'string' ? response : response.message || exception.message;

        return {
            status,
            message: Array.isArray(message) ? message[0] : message,
            error: typeof response === 'string' ? 'HTTP_EXCEPTION' : response.error || 'HTTP_EXCEPTION',
            details: [
                {
                    code: 'HTTP_EXCEPTION',
                    description: Array.isArray(message) ? message.join(', ') : message,
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

        if (exception instanceof MovelNotFoundException) {
            return this.handleMovelNotFound(exception);
        }

        if (exception instanceof MovelCampoObrigatorioException) {
            return this.handleMovelCampoObrigatorio(exception);
        }

        if (exception instanceof MovelDataInicioInvalidaException) {
            return this.handleMovelDataInicioInvalida(exception);
        }

        if (exception instanceof MovelHorasHomemInvalidaException) {
            return this.handleMovelHorasHomemInvalida(exception);
        }

        if (exception instanceof MovelRestauradoInconsistenteException) {
            return this.handleMovelRestauradoInconsistente(exception);
        }

        if (exception instanceof MovelEmProcessoHorasInvalidaException) {
            return this.handleMovelEmProcessoHorasInvalida(exception);
        }

        if (exception instanceof AtelieNaoEncontradoParaMovelException) {
            return this.handleAtelieNaoEncontradoParaMovel(exception);
        }

        if (exception instanceof MovelDataAnteriorFundacaoException) {
            return this.handleMovelDataAnteriorFundacao(exception);
        }

        if (exception instanceof MovelDuplicadoEmRestauracaoException) {
            return this.handleMovelDuplicadoEmRestauracao(exception);
        }

        if (exception instanceof HttpException) {
            return this.handleHttpException(exception);
        }

        return this.handleUnknown(exception);
    }
}
