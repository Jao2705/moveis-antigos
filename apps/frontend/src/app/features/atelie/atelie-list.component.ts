import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AtelieApiService } from '../../core/atelie-api.service';
import { Atelie } from '../../core/models';
import { extractApiError } from '../../core/api-error.util';
import { AuthService } from '../../core/auth.service';
import { UiButtonComponent } from '../../shared/ui/ui-button.component';
import { UiCardComponent } from '../../shared/ui/ui-card.component';

@Component({
  selector: 'app-atelie-list',
  imports: [RouterLink, DatePipe, UiButtonComponent, UiCardComponent],
  templateUrl: './atelie-list.component.html',
})
export class AtelieListComponent implements OnInit {
  private readonly api = inject(AtelieApiService);
  protected readonly auth = inject(AuthService);

  readonly loading = signal(true);
  readonly items = signal<Atelie[]>([]);
  readonly errorMessage = signal<string | null>(null);
  readonly actionMessage = signal<string | null>(null);
  readonly deleteTarget = signal<Atelie | null>(null);
  readonly deleteError = signal<string | null>(null);

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

  confirmDelete(item: Atelie): void {
    this.deleteError.set(null);
    this.deleteTarget.set(item);
  }

  deleteConfirmed(): void {
    const target = this.deleteTarget();
    if (!target) return;

    this.api.delete(target.id).subscribe({
      next: () => {
        this.deleteTarget.set(null);
        this.actionMessage.set('Ateliê excluído com sucesso.');
        this.load();
      },
      error: (error) => {
        this.deleteError.set(extractApiError(error).message);
      },
    });
  }
}
