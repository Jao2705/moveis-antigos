import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovelApiService } from '../../core/movel-api.service';
import { AtelieApiService } from '../../core/atelie-api.service';
import { Movel, Atelie } from '../../core/models';
import { extractApiError } from '../../core/api-error.util';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-movel-list',
  imports: [RouterLink, DatePipe],
  template: `
    <section>
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-2xl font-semibold">Móveis</h2>
        @if (auth.isAdmin()) {
          <a routerLink="/movel/novo" class="rounded-md bg-amber-800 px-4 py-2 text-sm text-white">Novo móvel</a>
        }
      </div>

      @if (loading()) {
        <p class="text-stone-600">Carregando móveis...</p>
      } @else if (errorMessage()) {
        <div class="rounded-md bg-red-50 p-3 text-sm text-red-700">{{ errorMessage() }}</div>
      } @else if (items().length === 0) {
        <div class="rounded-md border border-dashed border-stone-300 p-6 text-stone-600">
          Nenhum móvel cadastrado.
        </div>
      } @else {
        @if (actionMessage()) {
          <div class="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-800">{{ actionMessage() }}</div>
        }
        <div class="overflow-x-auto rounded-xl border border-stone-200 bg-white">
          <table class="min-w-full text-sm">
            <thead class="bg-stone-100 text-left">
              <tr>
                <th class="px-4 py-3">Tipo</th>
                <th class="px-4 py-3">Ateliê</th>
                <th class="px-4 py-3">Início</th>
                <th class="px-4 py-3">Restaurado</th>
                <th class="px-4 py-3">Horas-homem</th>
                @if (auth.isAdmin()) {
                  <th class="px-4 py-3">Ações</th>
                }
              </tr>
            </thead>
            <tbody>
              @for (item of items(); track item.id) {
                <tr class="border-t border-stone-100">
                  <td class="px-4 py-3">{{ item.tipoMovel }}</td>
                  <td class="px-4 py-3">{{ atelieLabel(item.atelieId) }}</td>
                  <td class="px-4 py-3">{{ item.dataInicioTrab | date: 'dd/MM/yyyy' }}</td>
                  <td class="px-4 py-3">{{ item.restaurado ? 'Sim' : 'Não' }}</td>
                  <td class="px-4 py-3">{{ item.horasHomem }}</td>
                  @if (auth.isAdmin()) {
                    <td class="px-4 py-3 space-x-2">
                      <a [routerLink]="['/movel/editar', item.id]" class="text-amber-800 hover:underline">Editar</a>
                      <button type="button" class="text-red-700 hover:underline" (click)="confirmDelete(item)">Excluir</button>
                    </td>
                  }
                </tr>
              }
            </tbody>
          </table>
        </div>
      }

      @if (deleteTarget()) {
        <div class="fixed inset-0 flex items-center justify-center bg-black/40 p-4">
          <div class="w-full max-w-md rounded-xl bg-white p-6">
            <h3 class="text-lg font-semibold">Confirmar exclusão</h3>
            <p class="mt-2 text-sm text-stone-600">Deseja excluir o móvel "{{ deleteTarget()?.tipoMovel }}"?</p>
            @if (deleteError()) {
              <p class="mt-2 text-sm text-red-600">{{ deleteError() }}</p>
            }
            <div class="mt-4 flex justify-end gap-2">
              <button type="button" class="rounded-md border px-3 py-2" (click)="deleteTarget.set(null)">Cancelar</button>
              <button type="button" class="rounded-md bg-red-700 px-3 py-2 text-white" (click)="deleteConfirmed()">Excluir</button>
            </div>
          </div>
        </div>
      }
    </section>
  `,
})
export class MovelListComponent implements OnInit {
  private readonly api = inject(MovelApiService);
  private readonly atelieApi = inject(AtelieApiService);
  protected readonly auth = inject(AuthService);

  readonly loading = signal(true);
  readonly items = signal<Movel[]>([]);
  readonly atelies = signal<Atelie[]>([]);
  readonly errorMessage = signal<string | null>(null);
  readonly actionMessage = signal<string | null>(null);
  readonly deleteTarget = signal<Movel | null>(null);
  readonly deleteError = signal<string | null>(null);

  ngOnInit(): void {
    this.atelieApi.list().subscribe({
      next: (data) => this.atelies.set(data),
    });
    this.load();
  }

  atelieLabel(id: number): string {
    return this.atelies().find((a) => a.id === id)?.especialidadeEra ?? `#${id}`;
  }

  load(): void {
    this.loading.set(true);
    this.errorMessage.set(null);
    this.api.list().subscribe({
      next: (data) => {
        this.items.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        this.errorMessage.set(extractApiError(error).message);
        this.loading.set(false);
      },
    });
  }

  confirmDelete(item: Movel): void {
    this.deleteError.set(null);
    this.deleteTarget.set(item);
  }

  deleteConfirmed(): void {
    const target = this.deleteTarget();
    if (!target) return;

    this.api.delete(target.id).subscribe({
      next: () => {
        this.deleteTarget.set(null);
        this.actionMessage.set('Móvel excluído com sucesso.');
        this.load();
      },
      error: (error) => {
        this.deleteError.set(extractApiError(error).message);
      },
    });
  }
}
