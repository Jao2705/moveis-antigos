import { Component, inject, OnInit, signal } from '@angular/core';
import { UsersApiService } from '../../core/users-api.service';
import { AppUser } from '../../core/models';
import { extractApiError } from '../../core/api-error.util';
import { UiButtonComponent } from '../../shared/ui/ui-button.component';
import { UiCardComponent } from '../../shared/ui/ui-card.component';

@Component({
  selector: 'app-users-list',
  imports: [UiButtonComponent, UiCardComponent],
  templateUrl: './users-list.component.html',
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
