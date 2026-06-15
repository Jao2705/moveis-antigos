import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { extractApiError } from '../../core/api-error.util';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="mx-auto mt-16 max-w-md rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
      <h2 class="mb-2 text-2xl font-semibold">Entrar</h2>

      @if (infoMessage()) {
        <div class="mb-4 rounded-md bg-amber-50 p-3 text-sm text-amber-900">{{ infoMessage() }}</div>
      }

      @if (errorMessage()) {
        <div class="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{{ errorMessage() }}</div>
      }

      <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-4">
        <div>
          <label class="mb-1 block text-sm font-medium">E-mail</label>
          <input type="email" formControlName="email" class="w-full rounded-md border border-stone-300 px-3 py-2" />
          @if (fieldError('email')) {
            <p class="mt-1 text-sm text-red-600">{{ fieldError('email') }}</p>
          }
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium">Senha</label>
          <input type="password" formControlName="senha" class="w-full rounded-md border border-stone-300 px-3 py-2" />
          @if (fieldError('senha')) {
            <p class="mt-1 text-sm text-red-600">{{ fieldError('senha') }}</p>
          }
        </div>
        <button
          type="submit"
          [disabled]="loading()"
          class="w-full rounded-md bg-amber-800 px-4 py-2 text-white hover:bg-amber-700 disabled:opacity-60"
        >
          @if (loading()) { Entrando... } @else { Entrar }
        </button>
      </form>

      <div class="mt-4 flex justify-between text-sm">
        <a routerLink="/register" class="text-amber-800 hover:underline">Criar conta</a>
        <span class="text-stone-500">Esqueceu a senha? Contate o administrador.</span>
      </div>
    </div>
  `,
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly fieldErrors = signal<Record<string, string>>({});
  readonly infoMessage = signal<string | null>(this.auth.authMessage());

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor() {
    const reason = this.route.snapshot.queryParamMap.get('reason');
    if (reason === 'session') {
      this.infoMessage.set('Sua sessão expirou. Faça login novamente.');
    } else if (reason === 'auth') {
      this.infoMessage.set('Você precisa estar autenticado para acessar esta página.');
    }
  }

  fieldError(field: string): string | null {
    const apiError = this.fieldErrors()[field];
    if (apiError) return apiError;
    const control = this.form.get(field);
    if (control?.touched && control.invalid) {
      if (control.errors?.['required']) return 'Campo obrigatório.';
      if (control.errors?.['email']) return 'Informe um e-mail válido.';
      if (control.errors?.['minlength']) return 'Mínimo de 6 caracteres.';
    }
    return null;
  }

  submit(): void {
    this.errorMessage.set(null);
    this.fieldErrors.set({});
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const { email, senha } = this.form.getRawValue();
    this.auth.login(email, senha).subscribe({
      next: (response) => {
        this.auth.setSession(response.access_token, response.user);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        const parsed = extractApiError(error);
        this.errorMessage.set(parsed.message);
        this.fieldErrors.set(parsed.fieldErrors);
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }
}
