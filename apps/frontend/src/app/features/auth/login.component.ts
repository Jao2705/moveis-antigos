import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { extractApiError } from '../../core/api-error.util';
import { UiButtonComponent } from '../../shared/ui/ui-button.component';
import { UiCardComponent } from '../../shared/ui/ui-card.component';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, UiButtonComponent, UiCardComponent],
  templateUrl: './login.component.html',
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
