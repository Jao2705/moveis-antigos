import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AtelieApiService } from '../../core/atelie-api.service';
import { extractApiError } from '../../core/api-error.util';

@Component({
  selector: 'app-atelie-form',
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <section class="max-w-2xl rounded-xl border border-stone-200 bg-white p-6">
      <h2 class="mb-4 text-2xl font-semibold">{{ isEdit() ? 'Editar ateliê' : 'Novo ateliê' }}</h2>

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
              <label class="mb-1 block text-sm font-medium">Especialidade / Era</label>
              <input formControlName="especialidadeEra" class="w-full rounded-md border border-stone-300 px-3 py-2" />
              @if (fieldError('especialidadeEra')) {
                <p class="mt-1 text-sm text-red-600">{{ fieldError('especialidadeEra') }}</p>
              }
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium">Data de fundação</label>
              <input type="date" formControlName="dataFundacao" class="w-full rounded-md border border-stone-300 px-3 py-2" />
              @if (fieldError('dataFundacao')) {
                <p class="mt-1 text-sm text-red-600">{{ fieldError('dataFundacao') }}</p>
              }
            </div>
          }
          <div>
            <label class="mb-1 block text-sm font-medium">Área da oficina (m²)</label>
            <input type="number" formControlName="areaOficinaM2" class="w-full rounded-md border border-stone-300 px-3 py-2" />
            @if (fieldError('areaOficinaM2')) {
              <p class="mt-1 text-sm text-red-600">{{ fieldError('areaOficinaM2') }}</p>
            }
          </div>
          <div class="flex items-center gap-2">
            <input type="checkbox" formControlName="equipadoCompleto" id="equipado" />
            <label for="equipado">Equipado completo</label>
          </div>
          <div class="flex gap-2">
            <button type="submit" [disabled]="submitting()" class="rounded-md bg-amber-800 px-4 py-2 text-white disabled:opacity-60">
              @if (submitting()) { Salvando... } @else { Salvar }
            </button>
            <a routerLink="/atelie" class="rounded-md border px-4 py-2">Cancelar</a>
          </div>
        </form>
      }
    </section>
  `,
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
    especialidadeEra: ['', Validators.required],
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

    const request$ = this.isEdit() && this.editId
      ? this.api.update(this.editId, {
          areaOficinaM2: value.areaOficinaM2,
          equipadoCompleto: value.equipadoCompleto,
        })
      : this.api.create(value);

    request$.subscribe({
      next: () => {
        this.successMessage.set('Ateliê salvo com sucesso.');
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
}
