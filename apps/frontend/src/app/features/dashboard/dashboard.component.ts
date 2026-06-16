import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { UiCardComponent } from '../../shared/ui/ui-card.component';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, UiCardComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  protected readonly auth = inject(AuthService);
}
