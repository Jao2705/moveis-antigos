import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AreaExistsException } from 'src/atelie/domain/area.exception';
import { AtelieNotFoundException } from 'src/atelie/domain/atelie.not.found.exception';
import { DataException } from 'src/atelie/domain/data.exception';
import { EquipadoExistsExcepiton } from 'src/atelie/domain/equipado.exception';
import { EspecialidadeExistsException } from 'src/atelie/domain/especiladade-exists.exception';
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
} from 'src/movel/domain/movel.exceptions';
import {
  UserNotFoundException,
  EmailAlreadyExistsException,
  LastAdminException,
} from 'src/users/domain/user.exceptions';

export interface StandardErrorResponse {
  statusCode: number;
  message: string;
  timestamp: string;
  errors?: Record<string, string>;
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
      `${request.method} ${request.url} -> ${errorResponse.statusCode}`,
      exception instanceof Error ? exception.stack : String(exception),
    );

    response.status(errorResponse.statusCode).json(errorResponse);
  }

  private buildResponse(
    statusCode: number,
    message: string,
    errors?: Record<string, string>,
  ): StandardErrorResponse {
    const body: StandardErrorResponse = {
      statusCode,
      message,
      timestamp: new Date().toISOString(),
    };
    if (errors && Object.keys(errors).length > 0) {
      body.errors = errors;
    }
    return body;
  }

  private handleValidationException(
    exception: HttpException,
  ): StandardErrorResponse {
    const response = exception.getResponse() as {
      message?: string | string[];
      errors?: Record<string, string>;
    };

    if (response.errors) {
      return this.buildResponse(
        HttpStatus.BAD_REQUEST,
        'Existem campos inválidos no formulário.',
        response.errors,
      );
    }

    const messages = Array.isArray(response.message)
      ? response.message
      : [response.message ?? 'Existem campos inválidos no formulário.'];

    const errors: Record<string, string> = {};

    for (const item of messages) {
      const match = item.match(/^(\w+)\s/);
      const field = match?.[1] ?? 'form';
      errors[field] = item;
    }

    return this.buildResponse(
      HttpStatus.BAD_REQUEST,
      'Existem campos inválidos no formulário.',
      errors,
    );
  }

  private handleHttpException(exception: HttpException): StandardErrorResponse {
    const statusCode = exception.getStatus();
    const response = exception.getResponse() as
      | string
      | { message?: string | string[]; errors?: Record<string, string> };

    if (typeof response === 'object' && response.errors) {
      const message =
        typeof response.message === 'string'
          ? response.message
          : 'Existem campos inválidos no formulário.';
      return this.buildResponse(statusCode, message, response.errors);
    }

    const message =
      typeof response === 'string'
        ? response
        : Array.isArray(response.message)
          ? response.message[0]
          : (response.message ?? exception.message);

    return this.buildResponse(statusCode, message);
  }

  private resolveException(exception: unknown): StandardErrorResponse {
    if (exception instanceof AtelieNotFoundException) {
      return this.buildResponse(HttpStatus.NOT_FOUND, 'Ateliê não encontrado.');
    }

    if (exception instanceof EspecialidadeExistsException) {
      return this.buildResponse(
        HttpStatus.BAD_REQUEST,
        'Especialidade inválida ou excede o limite de caracteres.',
        { especialidadeEra: exception.message },
      );
    }

    if (exception instanceof EquipadoExistsExcepiton) {
      return this.buildResponse(
        HttpStatus.BAD_REQUEST,
        'O campo equipado é obrigatório e deve ser um valor booleano.',
        { equipadoCompleto: exception.message },
      );
    }

    if (exception instanceof AreaExistsException) {
      return this.buildResponse(
        HttpStatus.BAD_REQUEST,
        'A área da oficina deve ser maior ou igual a 40m².',
        { areaOficinaM2: exception.message },
      );
    }

    if (exception instanceof DataException) {
      return this.buildResponse(
        HttpStatus.BAD_REQUEST,
        'A data de fundação é inválida.',
        { dataFundacao: exception.message },
      );
    }

    if (exception instanceof MovelNotFoundException) {
      return this.buildResponse(HttpStatus.NOT_FOUND, 'Móvel não encontrado.');
    }

    if (exception instanceof MovelCampoObrigatorioException) {
      const field =
        exception.message.match(/^(\w+)\s+e obrigatorio/)?.[1] ?? 'form';
      return this.buildResponse(HttpStatus.BAD_REQUEST, exception.message, {
        [field]: exception.message,
      });
    }

    if (exception instanceof MovelDataInicioInvalidaException) {
      return this.buildResponse(
        HttpStatus.BAD_REQUEST,
        'Data de início do trabalho inválida.',
        { dataInicioTrab: exception.message },
      );
    }

    if (exception instanceof MovelHorasHomemInvalidaException) {
      return this.buildResponse(
        HttpStatus.BAD_REQUEST,
        'Quantidade de horas-homem inválida.',
        { horasHomem: exception.message },
      );
    }

    if (exception instanceof MovelRestauradoInconsistenteException) {
      return this.buildResponse(
        HttpStatus.BAD_REQUEST,
        'Inconsistência entre restaurado e horas-homem.',
        { restaurado: exception.message },
      );
    }

    if (exception instanceof MovelEmProcessoHorasInvalidaException) {
      return this.buildResponse(
        HttpStatus.BAD_REQUEST,
        'Horas-homem inválidas para móvel em processo de restauração.',
        { horasHomem: exception.message },
      );
    }

    if (exception instanceof AtelieNaoEncontradoParaMovelException) {
      return this.buildResponse(
        HttpStatus.NOT_FOUND,
        'Ateliê não encontrado para o móvel informado.',
      );
    }

    if (exception instanceof MovelDataAnteriorFundacaoException) {
      return this.buildResponse(
        HttpStatus.BAD_REQUEST,
        'A data de início do trabalho não pode ser anterior à data de fundação do ateliê.',
        { dataInicioTrab: exception.message },
      );
    }

    if (exception instanceof MovelDuplicadoEmRestauracaoException) {
      return this.buildResponse(
        HttpStatus.CONFLICT,
        'Já existe um móvel desse tipo em restauração para este ateliê.',
        { tipoMovel: exception.message },
      );
    }

    if (exception instanceof UserNotFoundException) {
      return this.buildResponse(
        HttpStatus.NOT_FOUND,
        'Usuário não encontrado.',
      );
    }

    if (exception instanceof EmailAlreadyExistsException) {
      return this.buildResponse(
        HttpStatus.CONFLICT,
        exception.message || 'E-mail já cadastrado no sistema.',
        { email: exception.message },
      );
    }

    if (exception instanceof LastAdminException) {
      return this.buildResponse(HttpStatus.BAD_REQUEST, exception.message);
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      if (status === 400) {
        const response = exception.getResponse();
        if (
          typeof response === 'object' &&
          response !== null &&
          ('message' in response || 'errors' in response)
        ) {
          return this.handleValidationException(exception);
        }
      }
      return this.handleHttpException(exception);
    }

    return this.buildResponse(
      HttpStatus.INTERNAL_SERVER_ERROR,
      'Erro interno no servidor.',
    );
  }
}
