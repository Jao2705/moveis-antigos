import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  template: `
    <section class="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
      <h2 class="text-2xl font-semibold">Dashboard</h2>
      <p class="mt-2 text-stone-600">Bem-vindo(a), {{ auth.user()?.nome }}.</p>
      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <a routerLink="/atelie" class="rounded-lg border border-stone-200 p-4 hover:border-amber-700">
          <h3 class="font-medium">Ateliês</h3>
          <p class="text-sm text-stone-600">Gerenciar entidade pai do tema.</p>
        </a>
        <a routerLink="/movel" class="rounded-lg border border-stone-200 p-4 hover:border-amber-700">
          <h3 class="font-medium">Móveis</h3>
          <p class="text-sm text-stone-600">Gerenciar entidade filho vinculada ao ateliê.</p>
        </a>
        @if (auth.isAdmin()) {
          <a routerLink="/admin/users" class="rounded-lg border border-stone-200 p-4 hover:border-amber-700">
            <h3 class="font-medium">Usuários</h3>
            <p class="text-sm text-stone-600">Ativar ou desativar contas cadastradas.</p>
          </a>
        }
      </div>
    </section>
  `,
})
export class DashboardComponent {
  protected readonly auth = inject(AuthService);
}
