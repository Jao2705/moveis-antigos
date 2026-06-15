import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthUser } from './models';

interface LoginResponse {
  access_token: string;
  user: AuthUser;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenSignal = signal<string | null>(null);
  private readonly userSignal = signal<AuthUser | null>(null);
  private readonly authMessageSignal = signal<string | null>(null);

  readonly token = this.tokenSignal.asReadonly();
  readonly user = this.userSignal.asReadonly();
  readonly authMessage = this.authMessageSignal.asReadonly();
  readonly isAuthenticated = computed(() => !!this.tokenSignal());
  readonly isAdmin = computed(() => this.userSignal()?.role === 'admin');

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {}

  login(email: string, senha: string) {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, {
      email,
      senha,
    });
  }

  register(nome: string, email: string, senha: string) {
    return this.http.post<{ message: string }>(`${environment.apiUrl}/auth/register`, {
      nome,
      email,
      senha,
    });
  }

  setSession(token: string, user: AuthUser): void {
    this.tokenSignal.set(token);
    this.userSignal.set(user);
    this.authMessageSignal.set(null);
  }

  clearSession(message?: string): void {
    this.tokenSignal.set(null);
    this.userSignal.set(null);
    if (message) {
      this.authMessageSignal.set(message);
    }
  }

  logout(): void {
    this.clearSession();
    this.router.navigate(['/login']);
  }

  handleUnauthorized(message = 'Sua sessão expirou. Faça login novamente.'): void {
    this.clearSession(message);
    this.router.navigate(['/login'], { queryParams: { reason: 'session' } });
  }
}
