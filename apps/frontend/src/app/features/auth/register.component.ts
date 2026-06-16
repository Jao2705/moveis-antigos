import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { extractApiError } from '../../core/api-error.util';
import { UiButtonComponent } from '../../shared/ui/ui-button.component';
import { UiCardComponent } from '../../shared/ui/ui-card.component';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, UiButtonComponent, UiCardComponent],
  templateUrl: './register.component.html',
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
