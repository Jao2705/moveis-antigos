import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { extractApiError } from '../../core/api-error.util';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="mx-auto mt-16 max-w-md rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
      <h2 class="mb-2 text-2xl font-semibold">Criar conta</h2>
      <p class="mb-4 text-sm text-stone-600">Após o cadastro, aguarde a liberação do administrador.</p>

      @if (successMessage()) {
        <div class="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-800">{{ successMessage() }}</div>
      }

      @if (errorMessage()) {
        <div class="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{{ errorMessage() }}</div>
      }

      <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-4">
        <div>
          <label class="mb-1 block text-sm font-medium">Nome</label>
          <input formControlName="nome" class="w-full rounded-md border border-stone-300 px-3 py-2" />
          @if (fieldError('nome')) {
            <p class="mt-1 text-sm text-red-600">{{ fieldError('nome') }}</p>
          }
        </div>
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
          @if (loading()) { Cadastrando... } @else { Cadastrar }
        </button>
      </form>

      <p class="mt-4 text-sm">
        Já possui conta?
        <a routerLink="/login" class="text-amber-800 hover:underline">Entrar</a>
      </p>
    </div>
  `,
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);
  readonly fieldErrors = signal<Record<string, string>>({});

  readonly form = this.fb.nonNullable.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
  });

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
    this.successMessage.set(null);
    this.fieldErrors.set({});
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const { nome, email, senha } = this.form.getRawValue();
    this.auth.register(nome, email, senha).subscribe({
      next: (response) => {
        this.successMessage.set(response.message);
        this.form.reset();
        setTimeout(() => this.router.navigate(['/login']), 2000);
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
