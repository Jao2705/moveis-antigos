import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Movel } from './models';

@Injectable({ providedIn: 'root' })
export class MovelApiService {
  constructor(private readonly http: HttpClient) {}

  list() {
    return this.http.get<Movel[]>(`${environment.apiUrl}/movel`);
  }

  getById(id: number) {
    return this.http.get<Movel>(`${environment.apiUrl}/movel/${id}`);
  }

  create(payload: Omit<Movel, 'id'>) {
    return this.http.post<Movel>(`${environment.apiUrl}/movel`, payload);
  }

  update(id: number, payload: Partial<Pick<Movel, 'restaurado' | 'horasHomem'>>) {
    return this.http.put<Movel>(`${environment.apiUrl}/movel/${id}`, payload);
  }

  delete(id: number) {
    return this.http.delete<void>(`${environment.apiUrl}/movel/${id}`);
  }
}
