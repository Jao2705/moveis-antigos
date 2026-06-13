"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AppExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const area_exception_1 = require("../../atelie/domain/area.exception");
const atelie_not_found_exception_1 = require("../../atelie/domain/atelie.not.found.exception");
const data_exception_1 = require("../../atelie/domain/data.exception");
const equipado_exception_1 = require("../../atelie/domain/equipado.exception");
const especiladade_exists_exception_1 = require("../../atelie/domain/especiladade-exists.exception");
const movel_exceptions_1 = require("../../movel/domain/movel.exceptions");
let AppExceptionFilter = AppExceptionFilter_1 = class AppExceptionFilter {
    logger = new common_1.Logger(AppExceptionFilter_1.name);
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const errorResponse = this.resolveException(exception);
        this.logger.error(`${request.method} ${request.url} -> ${errorResponse.status}`, exception instanceof Error ? exception.stack : String(exception));
        response.status(errorResponse.status).json(errorResponse);
    }
    handleAtelieNotFound(exception) {
        return {
            status: common_1.HttpStatus.NOT_FOUND,
            message: 'Ateliê não encontrado.',
            error: 'ATELIE_NOT_FOUND',
            details: [
                {
                    field: 'id',
                    code: 'ATELIE_NOT_FOUND',
                    description: exception.message,
                },
            ],
        };
    }
    handleEspecialidadeExistsException(exception) {
        const msg = typeof exception.getResponse === 'string'
            ? exception.getResponse
            : exception.message;
        return {
            status: common_1.HttpStatus.BAD_REQUEST,
            message: 'Especialidade inválida ou excede o limite de caracteres',
            error: 'ESPECIALIDADE_EXISTS',
            details: [
                {
                    field: 'especialidadeEra',
                    code: 'ESPECIALIDADE_EXISTS',
                    description: msg,
                },
            ],
        };
    }
    handleEquipadoExistsExcepiton(exception) {
        const msg = typeof exception.getResponse === 'function' &&
            typeof exception.getResponse() === 'string'
            ? exception.getResponse()
            : exception.message;
        return {
            status: common_1.HttpStatus.BAD_REQUEST,
            message: 'O campo equipado é obrigatório e deve ser um valor booleano',
            error: 'EQUIPADO_INVALIDO',
            details: [
                {
                    field: 'equipadoCompleto',
                    code: 'EQUIPADO_INVALIDO',
                    description: msg,
                },
            ],
        };
    }
    handleAreaExistsException(exception) {
        const msg = typeof exception.getResponse === 'function' &&
            typeof exception.getResponse() === 'string'
            ? exception.getResponse()
            : exception.message;
        return {
            status: common_1.HttpStatus.BAD_REQUEST,
            message: 'A área da oficina deve ser maior ou igual a 50m²',
            error: 'AREA_INVALIDA',
            details: [
                {
                    field: 'areaOficinaM2',
                    code: 'AREA_INVALIDA',
                    description: msg,
                },
            ],
        };
    }
    handleDataException(exception) {
        const msg = typeof exception.getResponse === 'function' &&
            typeof exception.getResponse() === 'string'
            ? exception.getResponse()
            : exception.message;
        return {
            status: common_1.HttpStatus.BAD_REQUEST,
            message: 'A data de fundação é inválida',
            error: 'DATA_INVALIDA',
            details: [
                {
                    field: 'dataFundacao',
                    code: 'DATA_INVALIDA',
                    description: msg,
                },
            ],
        };
    }
    handleMovelNotFound(exception) {
        return {
            status: common_1.HttpStatus.NOT_FOUND,
            message: 'Móvel não encontrado.',
            error: 'MOVEL_NOT_FOUND',
            details: [
                {
                    field: 'id',
                    code: 'MOVEL_NOT_FOUND',
                    description: exception.message,
                },
            ],
        };
    }
    handleMovelCampoObrigatorio(exception) {
        return {
            status: common_1.HttpStatus.BAD_REQUEST,
            message: 'Campo obrigatório não informado.',
            error: 'MOVEL_CAMPO_OBRIGATORIO',
            details: [
                {
                    code: 'MOVEL_CAMPO_OBRIGATORIO',
                    description: exception.message,
                },
            ],
        };
    }
    handleMovelDataInicioInvalida(exception) {
        return {
            status: common_1.HttpStatus.BAD_REQUEST,
            message: 'Data de início do trabalho inválida.',
            error: 'MOVEL_DATA_INICIO_INVALIDA',
            details: [
                {
                    field: 'dataInicioTrab',
                    code: 'MOVEL_DATA_INICIO_INVALIDA',
                    description: exception.message,
                },
            ],
        };
    }
    handleMovelHorasHomemInvalida(exception) {
        return {
            status: common_1.HttpStatus.BAD_REQUEST,
            message: 'Quantidade de horas-homem inválida.',
            error: 'MOVEL_HORAS_HOMEM_INVALIDA',
            details: [
                {
                    field: 'horasHomem',
                    code: 'MOVEL_HORAS_HOMEM_INVALIDA',
                    description: exception.message,
                },
            ],
        };
    }
    handleMovelRestauradoInconsistente(exception) {
        return {
            status: common_1.HttpStatus.BAD_REQUEST,
            message: 'Inconsistência entre restaurado e horas-homem.',
            error: 'MOVEL_RESTAURADO_INCONSISTENTE',
            details: [
                {
                    field: 'restaurado',
                    code: 'MOVEL_RESTAURADO_INCONSISTENTE',
                    description: exception.message,
                },
            ],
        };
    }
    handleMovelEmProcessoHorasInvalida(exception) {
        return {
            status: common_1.HttpStatus.BAD_REQUEST,
            message: 'Horas-homem inválidas para móvel em processo de restauração.',
            error: 'MOVEL_EM_PROCESSO_HORAS_INVALIDA',
            details: [
                {
                    field: 'horasHomem',
                    code: 'MOVEL_EM_PROCESSO_HORAS_INVALIDA',
                    description: exception.message,
                },
            ],
        };
    }
    handleAtelieNaoEncontradoParaMovel(exception) {
        return {
            status: common_1.HttpStatus.NOT_FOUND,
            message: 'Ateliê não encontrado para o móvel informado.',
            error: 'ATELIE_NAO_ENCONTRADO_PARA_MOVEL',
            details: [
                {
                    field: 'atelieId',
                    code: 'ATELIE_NAO_ENCONTRADO_PARA_MOVEL',
                    description: exception.message,
                },
            ],
        };
    }
    handleMovelDataAnteriorFundacao(exception) {
        return {
            status: common_1.HttpStatus.BAD_REQUEST,
            message: 'A data de início do trabalho não pode ser anterior à data de fundação do ateliê.',
            error: 'MOVEL_DATA_ANTERIOR_FUNDACAO',
            details: [
                {
                    field: 'dataInicioTrab',
                    code: 'MOVEL_DATA_ANTERIOR_FUNDACAO',
                    description: exception.message,
                },
            ],
        };
    }
    handleMovelDuplicadoEmRestauracao(exception) {
        return {
            status: common_1.HttpStatus.CONFLICT,
            message: 'Já existe um móvel desse tipo em restauração para este ateliê.',
            error: 'MOVEL_DUPLICADO_EM_RESTAURACAO',
            details: [
                {
                    code: 'MOVEL_DUPLICADO_EM_RESTAURACAO',
                    description: exception.message,
                },
            ],
        };
    }
    handleHttpException(exception) {
        const status = exception.getStatus();
        const response = exception.getResponse();
        const message = typeof response === 'string'
            ? response
            : response.message || exception.message;
        return {
            status,
            message: Array.isArray(message) ? message[0] : message,
            error: typeof response === 'string'
                ? 'HTTP_EXCEPTION'
                : response.error || 'HTTP_EXCEPTION',
            details: [
                {
                    code: 'HTTP_EXCEPTION',
                    description: Array.isArray(message) ? message.join(', ') : message,
                },
            ],
        };
    }
    handleUnknown(exception) {
        const msg = exception instanceof Error
            ? exception.message
            : 'Erro interno no servidor';
        return {
            status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Erro interno no servidor',
            error: 'INTERNAL_SERVER_ERROR',
            details: [
                {
                    code: 'INTERNAL_SERVER_ERROR',
                    description: msg,
                },
            ],
        };
    }
    resolveException(exception) {
        if (exception instanceof atelie_not_found_exception_1.AtelieNotFoundException) {
            return this.handleAtelieNotFound(exception);
        }
        if (exception instanceof especiladade_exists_exception_1.EspecialidadeExistsException) {
            return this.handleEspecialidadeExistsException(exception);
        }
        if (exception instanceof equipado_exception_1.EquipadoExistsExcepiton) {
            return this.handleEquipadoExistsExcepiton(exception);
        }
        if (exception instanceof area_exception_1.AreaExistsException) {
            return this.handleAreaExistsException(exception);
        }
        if (exception instanceof data_exception_1.DataException) {
            return this.handleDataException(exception);
        }
        if (exception instanceof movel_exceptions_1.MovelNotFoundException) {
            return this.handleMovelNotFound(exception);
        }
        if (exception instanceof movel_exceptions_1.MovelCampoObrigatorioException) {
            return this.handleMovelCampoObrigatorio(exception);
        }
        if (exception instanceof movel_exceptions_1.MovelDataInicioInvalidaException) {
            return this.handleMovelDataInicioInvalida(exception);
        }
        if (exception instanceof movel_exceptions_1.MovelHorasHomemInvalidaException) {
            return this.handleMovelHorasHomemInvalida(exception);
        }
        if (exception instanceof movel_exceptions_1.MovelRestauradoInconsistenteException) {
            return this.handleMovelRestauradoInconsistente(exception);
        }
        if (exception instanceof movel_exceptions_1.MovelEmProcessoHorasInvalidaException) {
            return this.handleMovelEmProcessoHorasInvalida(exception);
        }
        if (exception instanceof movel_exceptions_1.AtelieNaoEncontradoParaMovelException) {
            return this.handleAtelieNaoEncontradoParaMovel(exception);
        }
        if (exception instanceof movel_exceptions_1.MovelDataAnteriorFundacaoException) {
            return this.handleMovelDataAnteriorFundacao(exception);
        }
        if (exception instanceof movel_exceptions_1.MovelDuplicadoEmRestauracaoException) {
            return this.handleMovelDuplicadoEmRestauracao(exception);
        }
        if (exception instanceof common_1.HttpException) {
            return this.handleHttpException(exception);
        }
        return this.handleUnknown(exception);
    }
};
exports.AppExceptionFilter = AppExceptionFilter;
exports.AppExceptionFilter = AppExceptionFilter = AppExceptionFilter_1 = __decorate([
    (0, common_1.Catch)()
], AppExceptionFilter);
//# sourceMappingURL=all-exceptions.filter.js.map