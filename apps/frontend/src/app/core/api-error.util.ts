import { HttpErrorResponse } from '@angular/common/http';
import { ApiErrorBody } from './models';

export interface ParsedApiError {
  message: string;
  fieldErrors: Record<string, string>;
}

export function extractApiError(error: unknown): ParsedApiError {
  if (error instanceof HttpErrorResponse) {
    if (error.status === 0) {
      return {
        message: 'Não foi possível conectar ao servidor. Verifique sua conexão.',
        fieldErrors: {},
      };
    }

    const body = error.error as ApiErrorBody | null;
    if (body?.message) {
      return {
        message: body.message,
        fieldErrors: body.errors ?? {},
      };
    }
  }

  return {
    message: 'Ocorreu um erro inesperado. Tente novamente.',
    fieldErrors: {},
  };
}
