import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MovelApiService } from '../../core/movel-api.service';
import { AtelieApiService } from '../../core/atelie-api.service';
import { Atelie } from '../../core/models';
import { extractApiError } from '../../core/api-error.util';

@Component({
  selector: 'app-movel-form',
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <section class="max-w-2xl rounded-xl border border-stone-200 bg-white p-6">
      <h2 class="mb-4 text-2xl font-semibold">{{ isEdit() ? 'Editar móvel' : 'Novo móvel' }}</h2>

      @if (loadingData()) {
        <p>Carregando...</p>
      } @else {
        @if (errorMessage()) {
          <div class="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{{ errorMessage() }}</div>
        }
        @if (successMessage()) {
          <div class="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-800">{{ successMessage() }}</div>
        }

        <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-4">
          @if (!isEdit()) {
            <div>
              <label class="mb-1 block text-sm font-medium">Tipo do móvel</label>
              <input formControlName="tipoMovel" class="w-full rounded-md border border-stone-300 px-3 py-2" />
              @if (fieldError('tipoMovel')) {
                <p class="mt-1 text-sm text-red-600">{{ fieldError('tipoMovel') }}</p>
              }
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium">Data início do trabalho</label>
              <input type="date" formControlName="dataInicioTrab" class="w-full rounded-md border border-stone-300 px-3 py-2" />
              @if (fieldError('dataInicioTrab')) {
                <p class="mt-1 text-sm text-red-600">{{ fieldError('dataInicioTrab') }}</p>
              }
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium">Ateliê</label>
              <select formControlName="atelieId" class="w-full rounded-md border border-stone-300 px-3 py-2">
                <option value="">Selecione...</option>
                @for (atelie of atelies(); track atelie.id) {
                  <option [value]="atelie.id">{{ atelie.especialidadeEra }}</option>
                }
              </select>
              @if (fieldError('atelieId')) {
                <p class="mt-1 text-sm text-red-600">{{ fieldError('atelieId') }}</p>
              }
            </div>
          }
          <div class="flex items-center gap-2">
            <input type="checkbox" formControlName="restaurado" id="restaurado" />
            <label for="restaurado">Restaurado</label>
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium">Horas-homem</label>
            <input type="number" formControlName="horasHomem" class="w-full rounded-md border border-stone-300 px-3 py-2" />
            @if (fieldError('horasHomem')) {
              <p class="mt-1 text-sm text-red-600">{{ fieldError('horasHomem') }}</p>
            }
          </div>
          <div class="flex gap-2">
            <button type="submit" [disabled]="submitting()" class="rounded-md bg-amber-800 px-4 py-2 text-white disabled:opacity-60">
              @if (submitting()) { Salvando... } @else { Salvar }
            </button>
            <a routerLink="/movel" class="rounded-md border px-4 py-2">Cancelar</a>
          </div>
        </form>
      }
    </section>
  `,
})
export class MovelFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(MovelApiService);
  private readonly atelieApi = inject(AtelieApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly isEdit = signal(false);
  readonly loadingData = signal(false);
  readonly submitting = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);
  readonly fieldErrors = signal<Record<string, string>>({});
  readonly atelies = signal<Atelie[]>([]);

  readonly form = this.fb.nonNullable.group({
    tipoMovel: ['', Validators.required],
    dataInicioTrab: ['', Validators.required],
    restaurado: [false],
    horasHomem: [40, [Validators.required, Validators.min(1)]],
    atelieId: ['', Validators.required],
  });

  private editId: number | null = null;

  ngOnInit(): void {
    this.atelieApi.list().subscribe({
      next: (data) => this.atelies.set(data),
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
        this.form.patchValue({
          tipoMovel: item.tipoMovel,
          dataInicioTrab: item.dataInicioTrab.substring(0, 10),
          restaurado: item.restaurado,
          horasHomem: item.horasHomem,
          atelieId: String(item.atelieId),
        });
        this.loadingData.set(false);
      },
      error: (error) => {
        this.errorMessage.set(extractApiError(error).message);
        this.loadingData.set(false);
        if (error.status === 404) {
          setTimeout(() => this.router.navigate(['/movel']), 1500);
        }
      },
    });
  }

  fieldError(field: string): string | null {
    return this.fieldErrors()[field] ?? null;
  }

  submit(): void {
    this.errorMessage.set(null);
    this.successMessage.set(null);
    this.fieldErrors.set({});
    if (this.form.invalid) {
      this.form.markAllAsTouched();
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
            atelieId: Number(value.atelieId),
          });

    request$.subscribe({
      next: () => {
        this.successMessage.set('Móvel salvo com sucesso.');
        setTimeout(() => this.router.navigate(['/movel']), 1000);
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
