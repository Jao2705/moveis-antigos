export interface AuthUser {
  id: number;
  nome: string;
  email: string;
  role: 'admin' | 'user';
  ativo?: boolean;
}

export interface ApiErrorBody {
  statusCode: number;
  message: string;
  timestamp: string;
  errors?: Record<string, string>;
}

export interface Atelie {
  id: number;
  especialidadeEra: string;
  dataFundacao: string;
  equipadoCompleto: boolean;
  areaOficinaM2: number;
}

export interface Movel {
  id: number;
  tipoMovel: string;
  dataInicioTrab: string;
  restaurado: boolean;
  horasHomem: number;
  atelieId: number;
}

export interface AppUser {
  id: number;
  nome: string;
  email: string;
  role: 'admin' | 'user';
  ativo: boolean;
}
