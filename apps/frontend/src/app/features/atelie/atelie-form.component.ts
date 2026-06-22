import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AtelieApiService } from '../../core/atelie-api.service';
import { extractApiError } from '../../core/api-error.util';
import { collectFormFieldErrors, invalidFieldsMessage } from '../../shared/form-error.util';
import { UiButtonComponent } from '../../shared/ui/ui-button.component';
import { UiCardComponent } from '../../shared/ui/ui-card.component';

@Component({
  selector: 'app-atelie-form',
  imports: [ReactiveFormsModule, RouterLink, UiButtonComponent, UiCardComponent],
  templateUrl: './atelie-form.component.html',
})
export class AtelieFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(AtelieApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly isEdit = signal(false);
  readonly loadingData = signal(false);
  readonly submitting = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);
  readonly fieldErrors = signal<Record<string, string>>({});

  readonly form = this.fb.nonNullable.group({
    especialidadeEra: ['', [Validators.required, Validators.maxLength(100)]],
    dataFundacao: ['', Validators.required],
    areaOficinaM2: [50, [Validators.required, Validators.min(50)]],
    equipadoCompleto: [false],
  });

  private editId: number | null = null;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit.set(true);
      this.editId = Number(idParam);
      this.loadItem(this.editId);
    }
  }

  loadItem(id: number): void {
    this.loadingData.set(true);
    this.api.getById(id).subscribe({
      next: (item) => {
        this.form.patchValue({
          especialidadeEra: item.especialidadeEra,
          dataFundacao: item.dataFundacao.substring(0, 10),
          areaOficinaM2: item.areaOficinaM2,
          equipadoCompleto: item.equipadoCompleto,
        });
        this.loadingData.set(false);
      },
      error: (error) => {
        this.errorMessage.set(extractApiError(error).message);
        this.loadingData.set(false);
        if (error.status === 404) {
          setTimeout(() => this.router.navigate(['/atelie'], { state: { message: 'Ateliê não encontrado.' } }), 1500);
        }
      },
    });
  }

  fieldError(field: string): string | null {
    const backendError = this.fieldErrors()[field];
    if (backendError) {
      return backendError;
    }

    const control = this.form.get(field);
    if (!control || !control.touched || !control.invalid) {
      return null;
    }

    if (control.hasError('required')) {
      return field === 'especialidadeEra'
        ? 'A especialidade / era é obrigatória.'
        : field === 'dataFundacao'
          ? 'A data de fundação é obrigatória.'
          : 'Este campo é obrigatório.';
    }

    if (control.hasError('min')) {
      return 'A área da oficina deve ter no mínimo 50 m².';
    }

    if (control.hasError('maxlength')) {
      return 'A especialidade / era deve ter no máximo 100 caracteres.';
    }

    return 'Valor inválido.';
  }

  submit(): void {
    this.errorMessage.set(null);
    this.successMessage.set(null);
    this.fieldErrors.set({});
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.fieldErrors.set(collectFormFieldErrors(this.form, this.resolveFieldMessage.bind(this)));
      this.errorMessage.set(invalidFieldsMessage());
      return;
    }

    this.submitting.set(true);
    const value = this.form.getRawValue();

    const request$ = this.isEdit() && this.editId
      ? this.api.update(this.editId, {
        areaOficinaM2: value.areaOficinaM2,
        equipadoCompleto: value.equipadoCompleto,
      })
      : this.api.create(value);

    request$.subscribe({
      next: () => {
        this.successMessage.set('Ateliê registrado com sucesso.');
        setTimeout(() => this.router.navigate(['/atelie']), 1000);
      },
      error: (error) => {
        const parsed = extractApiError(error);
        this.errorMessage.set(parsed.message);
        this.fieldErrors.set(parsed.fieldErrors);
        this.submitting.set(false);
      },
      complete: () => this.submitting.set(false),
    });
  }

  private resolveFieldMessage(field: string): string | null {
    const control = this.form.get(field);
    if (!control || !control.invalid) {
      return null;
    }

    if (control.hasError('required')) {
      return field === 'especialidadeEra'
        ? 'A especialidade / era é obrigatória.'
        : field === 'dataFundacao'
          ? 'A data de fundação é obrigatória.'
          : 'Este campo é obrigatório.';
    }

    if (control.hasError('min')) {
      return 'A área da oficina deve ter no mínimo 50 m².';
    }

    if (control.hasError('maxlength')) {
      return 'A especialidade / era deve ter no máximo 100 caracteres.';
    }

    return 'Valor inválido.';
  }
}
