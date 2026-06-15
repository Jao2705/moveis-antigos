import { Component, inject, OnInit, signal } from '@angular/core';
import { UsersApiService } from '../../core/users-api.service';
import { AppUser } from '../../core/models';
import { extractApiError } from '../../core/api-error.util';

@Component({
  selector: 'app-users-list',
  template: `
    <section>
      <h2 class="mb-4 text-2xl font-semibold">Usuários</h2>

      @if (loading()) {
        <p class="text-stone-600">Carregando usuários...</p>
      } @else if (errorMessage()) {
        <div class="rounded-md bg-red-50 p-3 text-sm text-red-700">{{ errorMessage() }}</div>
      } @else if (items().length === 0) {
        <div class="rounded-md border border-dashed border-stone-300 p-6 text-stone-600">
          Nenhum usuário cadastrado.
        </div>
      } @else {
        @if (actionMessage()) {
          <div class="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-800">{{ actionMessage() }}</div>
        }
        @if (actionError()) {
          <div class="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{{ actionError() }}</div>
        }
        <div class="overflow-x-auto rounded-xl border border-stone-200 bg-white">
          <table class="min-w-full text-sm">
            <thead class="bg-stone-100 text-left">
              <tr>
                <th class="px-4 py-3">Nome</th>
                <th class="px-4 py-3">E-mail</th>
                <th class="px-4 py-3">Perfil</th>
                <th class="px-4 py-3">Status</th>
                <th class="px-4 py-3">Ação</th>
              </tr>
            </thead>
            <tbody>
              @for (user of items(); track user.id) {
                <tr class="border-t border-stone-100">
                  <td class="px-4 py-3">{{ user.nome }}</td>
                  <td class="px-4 py-3">{{ user.email }}</td>
                  <td class="px-4 py-3">{{ user.role }}</td>
                  <td class="px-4 py-3">{{ user.ativo ? 'Ativo' : 'Inativo' }}</td>
                  <td class="px-4 py-3">
                    <button
                      type="button"
                      class="rounded-md border px-3 py-1 hover:bg-stone-50"
                      [disabled]="updatingId() === user.id"
                      (click)="toggleActive(user)"
                    >
                      @if (updatingId() === user.id) {
                        Salvando...
                      } @else {
                        {{ user.ativo ? 'Desativar' : 'Ativar' }}
                      }
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }
    </section>
  `,
})
export class UsersListComponent implements OnInit {
  private readonly api = inject(UsersApiService);

  readonly loading = signal(true);
  readonly items = signal<AppUser[]>([]);
  readonly errorMessage = signal<string | null>(null);
  readonly actionMessage = signal<string | null>(null);
  readonly actionError = signal<string | null>(null);
  readonly updatingId = signal<number | null>(null);

  ngOnInit(): void {
    this.load();
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

  toggleActive(user: AppUser): void {
    this.actionMessage.set(null);
    this.actionError.set(null);
    this.updatingId.set(user.id);
    this.api.setActive(user.id, !user.ativo).subscribe({
      next: (updated) => {
        this.items.update((list) => list.map((u) => (u.id === updated.id ? updated : u)));
        this.actionMessage.set(`Usuário ${updated.ativo ? 'ativado' : 'desativado'} com sucesso.`);
        this.updatingId.set(null);
      },
      error: (error) => {
        this.actionError.set(extractApiError(error).message);
        this.updatingId.set(null);
      },
    });
  }
}
