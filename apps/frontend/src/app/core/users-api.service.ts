import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AppUser } from './models';

@Injectable({ providedIn: 'root' })
export class UsersApiService {
  constructor(private readonly http: HttpClient) {}

  list() {
    return this.http.get<AppUser[]>(`${environment.apiUrl}/users`);
  }

  setActive(id: number, ativo: boolean) {
    return this.http.patch<AppUser>(`${environment.apiUrl}/users/${id}/activate`, {
      ativo,
    });
  }
}
