import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { UiButtonComponent } from '../shared/ui/ui-button.component';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, UiButtonComponent],
  templateUrl: './shell.component.html',
})
export class ShellComponent {
  constructor(protected readonly auth: AuthService) {}
}
