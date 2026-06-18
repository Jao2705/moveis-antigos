import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AtelieApiService } from '../../core/atelie-api.service';
import { MovelApiService } from '../../core/movel-api.service';
import { Atelie } from '../../core/models';
import { AuthService } from '../../core/auth.service';
import { extractApiError } from '../../core/api-error.util';
import { UiButtonComponent } from '../../shared/ui/ui-button.component';
import { UiCardComponent } from '../../shared/ui/ui-card.component';

@Component({
  selector: 'app-movel-form',
  imports: [ReactiveFormsModule, RouterLink, UiButtonComponent, UiCardComponent],
  templateUrl: './movel-form.component.html',
})
export class MovelFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(MovelApiService);
  private readonly atelieApi = inject(AtelieApiService);
  private readonly auth = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly isEdit = signal(false);
  readonly loadingData = signal(false);
  readonly submitting = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);
  readonly fieldErrors = signal<Record<string, string>>({});
  readonly atelie = signal<Atelie | null>(null);

  readonly form = this.fb.nonNullable.group({
    tipoMovel: ['', Validators.required],
    dataInicioTrab: ['', Validators.required],
    restaurado: [false],
    horasHomem: [40, [Validators.required, Validators.min(10)]],
  });

  atelieId: number | null = null;
  private editId: number | null = null;

  ngOnInit(): void {
    const atelieIdParam = this.route.snapshot.paramMap.get('atelieId');
    if (!atelieIdParam || !Number.isInteger(Number(atelieIdParam)) || Number(atelieIdParam) <= 0) {
      void this.router.navigate(['/atelie']);
      return;
    }

    this.atelieId = Number(atelieIdParam);
    this.atelieApi.getById(this.atelieId).subscribe({
      next: (data) => this.atelie.set(data),
      error: () => void this.router.navigate(['/atelie']),
    });

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
        const user = this.auth.user();
        if (!this.auth.isAdmin() && item.ownerUserId !== user?.id) {
          this.errorMessage.set('Você só pode editar móveis cadastrados por você.');
          this.loadingData.set(false);
          setTimeout(() => this.router.navigate(['/atelie', this.atelieId]), 1500);
          return;
        }

        this.form.patchValue({
          tipoMovel: item.tipoMovel,
          dataInicioTrab: item.dataInicioTrab.substring(0, 10),
          restaurado: item.restaurado,
          horasHomem: item.horasHomem,
        });
        this.loadingData.set(false);
      },
      error: (error) => {
        this.errorMessage.set(extractApiError(error).message);
        this.loadingData.set(false);
        if (error.status === 404) {
          setTimeout(() => this.router.navigate(['/atelie', this.atelieId]), 1500);
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
      return field === 'tipoMovel'
        ? 'O tipo do móvel é obrigatório.'
        : field === 'dataInicioTrab'
          ? 'A data de início é obrigatória.'
          : 'Este campo é obrigatório.';
    }

    if (control.hasError('min')) {
      return 'As horas-homem devem ter no mínimo 10 horas.';
    }

    return 'Valor inválido.';
  }

  submit(): void {
    this.errorMessage.set(null);
    this.successMessage.set(null);
    this.fieldErrors.set({});
    if (!this.atelieId) {
      this.errorMessage.set('Ateliê inválido.');
      this.submitting.set(false);
      return;
    }
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMessage.set('Corrija os campos destacados para salvar o móvel.');
      return;
    }

    this.submitting.set(true);
    const value = this.form.getRawValue();

    const request$ =
      this.isEdit() && this.editId
        ? this.api.update(this.editId, {
            restaurado: value.restaurado,
            horasHomem: value.horasHomem,
          })
      : this.api.create({
          tipoMovel: value.tipoMovel,
          dataInicioTrab: value.dataInicioTrab,
          restaurado: value.restaurado,
          horasHomem: value.horasHomem,
          atelieId: this.atelieId,
        });

    request$.subscribe({
      next: () => {
        this.successMessage.set('Móvel salvo com sucesso.');
        setTimeout(() => this.router.navigate(['/atelie', this.atelieId]), 1000);
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
}
