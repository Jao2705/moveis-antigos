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
const user_exceptions_1 = require("../../users/domain/user.exceptions");
let AppExceptionFilter = AppExceptionFilter_1 = class AppExceptionFilter {
    logger = new common_1.Logger(AppExceptionFilter_1.name);
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const errorResponse = this.resolveException(exception);
        this.logger.error(`${request.method} ${request.url} -> ${errorResponse.statusCode}`, exception instanceof Error ? exception.stack : String(exception));
        response.status(errorResponse.statusCode).json(errorResponse);
    }
    buildResponse(statusCode, message, errors) {
        const body = {
            statusCode,
            message,
            timestamp: new Date().toISOString(),
        };
        if (errors && Object.keys(errors).length > 0) {
            body.errors = errors;
        }
        return body;
    }
    handleValidationException(exception) {
        const response = exception.getResponse();
        if (response.errors) {
            return this.buildResponse(common_1.HttpStatus.BAD_REQUEST, 'Existem campos inválidos no formulário.', response.errors);
        }
        const messages = Array.isArray(response.message)
            ? response.message
            : [response.message ?? 'Existem campos inválidos no formulário.'];
        const errors = {};
        for (const item of messages) {
            const match = item.match(/^(\w+)\s/);
            const field = match?.[1] ?? 'form';
            errors[field] = item;
        }
        return this.buildResponse(common_1.HttpStatus.BAD_REQUEST, 'Existem campos inválidos no formulário.', errors);
    }
    handleHttpException(exception) {
        const statusCode = exception.getStatus();
        const response = exception.getResponse();
        if (typeof response === 'object' && response.errors) {
            const message = typeof response.message === 'string'
                ? response.message
                : 'Existem campos inválidos no formulário.';
            return this.buildResponse(statusCode, message, response.errors);
        }
        const message = typeof response === 'string'
            ? response
            : Array.isArray(response.message)
                ? response.message[0]
                : (response.message ?? exception.message);
        return this.buildResponse(statusCode, message);
    }
    resolveException(exception) {
        if (exception instanceof atelie_not_found_exception_1.AtelieNotFoundException) {
            return this.buildResponse(common_1.HttpStatus.NOT_FOUND, 'Ateliê não encontrado.');
        }
        if (exception instanceof especiladade_exists_exception_1.EspecialidadeExistsException) {
            return this.buildResponse(common_1.HttpStatus.BAD_REQUEST, 'Especialidade inválida ou excede o limite de caracteres.', { especialidadeEra: exception.message });
        }
        if (exception instanceof equipado_exception_1.EquipadoExistsExcepiton) {
            return this.buildResponse(common_1.HttpStatus.BAD_REQUEST, 'O campo equipado é obrigatório e deve ser um valor booleano.', { equipadoCompleto: exception.message });
        }
        if (exception instanceof area_exception_1.AreaExistsException) {
            return this.buildResponse(common_1.HttpStatus.BAD_REQUEST, 'A área da oficina deve ser maior ou igual a 40m².', { areaOficinaM2: exception.message });
        }
        if (exception instanceof data_exception_1.DataException) {
            return this.buildResponse(common_1.HttpStatus.BAD_REQUEST, 'A data de fundação é inválida.', { dataFundacao: exception.message });
        }
        if (exception instanceof movel_exceptions_1.MovelNotFoundException) {
            return this.buildResponse(common_1.HttpStatus.NOT_FOUND, 'Móvel não encontrado.');
        }
        if (exception instanceof movel_exceptions_1.MovelCampoObrigatorioException) {
            const field = exception.message.match(/^(\w+)\s+e obrigatorio/)?.[1] ?? 'form';
            return this.buildResponse(common_1.HttpStatus.BAD_REQUEST, exception.message, {
                [field]: exception.message,
            });
        }
        if (exception instanceof movel_exceptions_1.MovelDataInicioInvalidaException) {
            return this.buildResponse(common_1.HttpStatus.BAD_REQUEST, 'Data de início do trabalho inválida.', { dataInicioTrab: exception.message });
        }
        if (exception instanceof movel_exceptions_1.MovelHorasHomemInvalidaException) {
            return this.buildResponse(common_1.HttpStatus.BAD_REQUEST, 'Quantidade de horas-homem inválida.', { horasHomem: exception.message });
        }
        if (exception instanceof movel_exceptions_1.MovelRestauradoInconsistenteException) {
            return this.buildResponse(common_1.HttpStatus.BAD_REQUEST, 'Inconsistência entre restaurado e horas-homem.', { restaurado: exception.message });
        }
        if (exception instanceof movel_exceptions_1.MovelEmProcessoHorasInvalidaException) {
            return this.buildResponse(common_1.HttpStatus.BAD_REQUEST, 'Horas-homem inválidas para móvel em processo de restauração.', { horasHomem: exception.message });
        }
        if (exception instanceof movel_exceptions_1.AtelieNaoEncontradoParaMovelException) {
            return this.buildResponse(common_1.HttpStatus.NOT_FOUND, 'Ateliê não encontrado para o móvel informado.');
        }
        if (exception instanceof movel_exceptions_1.MovelDataAnteriorFundacaoException) {
            return this.buildResponse(common_1.HttpStatus.BAD_REQUEST, 'A data de início do trabalho não pode ser anterior à data de fundação do ateliê.', { dataInicioTrab: exception.message });
        }
        if (exception instanceof movel_exceptions_1.MovelDuplicadoEmRestauracaoException) {
            return this.buildResponse(common_1.HttpStatus.CONFLICT, 'Já existe um móvel desse tipo em restauração para este ateliê.', { tipoMovel: exception.message });
        }
        if (exception instanceof user_exceptions_1.UserNotFoundException) {
            return this.buildResponse(common_1.HttpStatus.NOT_FOUND, 'Usuário não encontrado.');
        }
        if (exception instanceof user_exceptions_1.EmailAlreadyExistsException) {
            return this.buildResponse(common_1.HttpStatus.CONFLICT, exception.message || 'E-mail já cadastrado no sistema.', { email: exception.message });
        }
        if (exception instanceof user_exceptions_1.LastAdminException) {
            return this.buildResponse(common_1.HttpStatus.BAD_REQUEST, exception.message);
        }
        if (exception instanceof common_1.HttpException) {
            const status = exception.getStatus();
            if (status === 400) {
                const response = exception.getResponse();
                if (typeof response === 'object' &&
                    response !== null &&
                    ('message' in response || 'errors' in response)) {
                    return this.handleValidationException(exception);
                }
            }
            return this.handleHttpException(exception);
        }
        return this.buildResponse(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Erro interno no servidor.');
    }
};
exports.AppExceptionFilter = AppExceptionFilter;
exports.AppExceptionFilter = AppExceptionFilter = AppExceptionFilter_1 = __decorate([
    (0, common_1.Catch)()
], AppExceptionFilter);
//# sourceMappingURL=all-exceptions.filter.js.map