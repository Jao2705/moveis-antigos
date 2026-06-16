import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { AtelieApiService } from '../../core/atelie-api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MovelApiService } from '../../core/movel-api.service';
import { AtelieComMoveis, Movel } from '../../core/models';
import { extractApiError } from '../../core/api-error.util';
import { AuthService } from '../../core/auth.service';
import { UiButtonComponent } from '../../shared/ui/ui-button.component';
import { UiCardComponent } from '../../shared/ui/ui-card.component';

@Component({
  selector: 'app-movel-list',
  imports: [RouterLink, DatePipe, UiButtonComponent, UiCardComponent],
  templateUrl: './movel-list.component.html',
})
export class MovelListComponent implements OnInit {
  private readonly api = inject(MovelApiService);
  private readonly atelieApi = inject(AtelieApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly auth = inject(AuthService);

  readonly loading = signal(true);
  readonly items = signal<Movel[]>([]);
  readonly atelie = signal<AtelieComMoveis | null>(null);
  readonly errorMessage = signal<string | null>(null);
  readonly actionMessage = signal<string | null>(null);
  readonly deleteTarget = signal<Movel | null>(null);
  readonly deleteError = signal<string | null>(null);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam || !Number.isInteger(Number(idParam)) || Number(idParam) <= 0) {
      void this.router.navigate(['/atelie']);
      return;
    }

    this.load(Number(idParam));
  }

  canManage(item: Movel): boolean {
    const user = this.auth.user();
    return this.auth.isAdmin() || user?.id === item.ownerUserId;
  }

  load(atelieId: number): void {
    this.loading.set(true);
    this.errorMessage.set(null);
    this.atelieApi.getByIdWithMoveis(atelieId).subscribe({
      next: (data) => {
        this.atelie.set(data);
        this.items.set(data.moveis);
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
        const currentAtelie = this.atelie();
        if (currentAtelie) {
          this.load(currentAtelie.id);
        }
      },
      error: (error) => {
        this.deleteError.set(extractApiError(error).message);
      },
    });
  }
}
