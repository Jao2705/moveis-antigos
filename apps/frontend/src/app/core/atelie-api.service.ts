import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Atelie } from './models';

@Injectable({ providedIn: 'root' })
export class AtelieApiService {
  constructor(private readonly http: HttpClient) {}

  list() {
    return this.http.get<Atelie[]>(`${environment.apiUrl}/atelie`);
  }

  getById(id: number) {
    return this.http.get<Atelie>(`${environment.apiUrl}/atelie/${id}`);
  }

  create(payload: Omit<Atelie, 'id'>) {
    return this.http.post<Atelie>(`${environment.apiUrl}/atelie`, payload);
  }

  update(id: number, payload: Partial<Pick<Atelie, 'equipadoCompleto' | 'areaOficinaM2'>>) {
    return this.http.put<Atelie>(`${environment.apiUrl}/atelie/${id}`, payload);
  }

  delete(id: number) {
    return this.http.delete<void>(`${environment.apiUrl}/atelie/${id}`);
  }
}
