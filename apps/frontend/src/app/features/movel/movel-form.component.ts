import { Component, inject, OnInit, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { isCommonMovelType } from '@moveisantigos/utils';
import { AtelieApiService } from '../../core/atelie-api.service';
import { MovelApiService } from '../../core/movel-api.service';
import { Atelie } from '../../core/models';
import { AuthService } from '../../core/auth.service';
import { extractApiError } from '../../core/api-error.util';
import { collectFormFieldErrors, invalidFieldsMessage } from '../../shared/form-error.util';
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
    tipoMovel: ['', [Validators.required, commonMovelTypeValidator()]],
    dataInicioTrab: ['', [Validators.required, startDateAfterAtelieValidator(() => this.atelie())]],
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
      next: (data) => {
        this.atelie.set(data);
        this.form.controls.dataInicioTrab.updateValueAndValidity();
      },
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
        this.form.controls.dataInicioTrab.updateValueAndValidity();
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

    if (control.hasError('commonMovelType')) {
      return 'Informe um tipo de móvel comum, como Sofá, Mesa de centro, Rack, Estante ou Cama.';
    }

    if (control.hasError('min')) {
      return 'As horas-homem devem ter no mínimo 10 horas.';
    }

    return 'Valor inválido.';
  }

  hoursHomemBusinessError(): string | null {
    const backendRuleError =
      this.fieldErrors()['horasHomem'] ?? this.fieldErrors()['restaurado'];
    if (backendRuleError) {
      return this.resolveHorasHomemRuleMessage();
    }

    const horasHomem = this.form.controls.horasHomem.value;
    const restaurado = this.form.controls.restaurado.value;

    if (restaurado && horasHomem < 40) {
      return 'Quando o móvel estiver como restaurado, as horas-homem precisam ser de pelo menos 40.';
    }

    if (!restaurado && horasHomem === 0) {
      return 'Se o móvel ainda não estiver restaurado, as horas-homem não podem ser zero.';
    }

    return null;
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
      this.fieldErrors.set(collectFormFieldErrors(this.form, this.resolveFieldMessage.bind(this)));
      this.errorMessage.set(invalidFieldsMessage());
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

  private resolveFieldMessage(field: string): string | null {
    const control = this.form.get(field);
    if (!control || !control.invalid) {
      return null;
    }

    if (control.hasError('required')) {
      return field === 'tipoMovel'
        ? 'O tipo do móvel é obrigatório.'
        : field === 'dataInicioTrab'
          ? 'A data de início é obrigatória.'
          : 'Este campo é obrigatório.';
    }

    if (control.hasError('commonMovelType')) {
      return 'Informe um tipo de móvel comum, como Sofá, Mesa de centro, Rack, Estante ou Cama.';
    }

    if (control.hasError('beforeAtelieFoundation')) {
      return 'A data de início do trabalho não pode ser anterior à data de fundação do ateliê.';
    }

    if (control.hasError('min')) {
      return 'As horas-homem devem ter no mínimo 10 horas.';
    }

    return 'Valor inválido.';
  }

  private resolveHorasHomemRuleMessage(): string {
    const horasHomem = this.form.controls.horasHomem.value;
    const restaurado = this.form.controls.restaurado.value;

    if (restaurado && horasHomem < 40) {
      return 'Quando o móvel estiver como restaurado, as horas-homem precisam ser de pelo menos 40.';
    }

    if (!restaurado && horasHomem === 0) {
      return 'Se o móvel ainda não estiver restaurado, as horas-homem não podem ser zero.';
    }

    return 'A combinação de restaurado e horas-homem está inconsistente.';
  }
}

function commonMovelTypeValidator(): ValidatorFn {
  return (control: AbstractControl<string>): ValidationErrors | null => {
    const value = control.value?.trim();
    if (!value) {
      return null;
    }

    return isCommonMovelType(value) ? null : { commonMovelType: true };
  };
}

function startDateAfterAtelieValidator(
  atelieGetter: () => Atelie | null,
): ValidatorFn {
  return (control: AbstractControl<string>): ValidationErrors | null => {
    const value = control.value?.trim();
    if (!value) {
      return null;
    }

    const atelie = atelieGetter();
    if (!atelie?.dataFundacao) {
      return null;
    }

    const startDate = new Date(value);
    const foundationDate = new Date(atelie.dataFundacao);

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(foundationDate.getTime())) {
      return null;
    }

    return startDate < foundationDate
      ? { beforeAtelieFoundation: true }
      : null;
  };
}
