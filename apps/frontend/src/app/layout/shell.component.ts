import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen bg-stone-50 text-stone-900">
      <header class="border-b border-stone-200 bg-white">
        <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <p class="text-sm text-stone-500">Relicário</p>
            <h1 class="text-lg font-semibold">Restauração de Móveis Antigos</h1>
          </div>
          <div class="flex items-center gap-4">
            <span class="text-sm text-stone-600">Olá, {{ auth.user()?.nome }}</span>
            <button
              type="button"
              class="rounded-md bg-stone-800 px-3 py-2 text-sm text-white hover:bg-stone-700"
              (click)="auth.logout()"
            >
              Sair
            </button>
          </div>
        </div>
        <nav class="mx-auto flex max-w-6xl gap-4 px-4 pb-3 text-sm">
          <a routerLink="/dashboard" routerLinkActive="font-semibold text-amber-800" class="hover:text-amber-800">Dashboard</a>
          <a routerLink="/atelie" routerLinkActive="font-semibold text-amber-800" class="hover:text-amber-800">Ateliês</a>
          <a routerLink="/movel" routerLinkActive="font-semibold text-amber-800" class="hover:text-amber-800">Móveis</a>
          @if (auth.isAdmin()) {
            <a routerLink="/admin/users" routerLinkActive="font-semibold text-amber-800" class="hover:text-amber-800">Usuários</a>
          }
        </nav>
      </header>
      <main class="mx-auto max-w-6xl px-4 py-6">
        <router-outlet />
      </main>
    </div>
  `,
})
export class ShellComponent {
  constructor(protected readonly auth: AuthService) {}
}
