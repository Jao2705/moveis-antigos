import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [NgClass],
  template: `
    <section [ngClass]="classes">
      <ng-content />
    </section>
  `,
})
export class UiCardComponent {
  @Input() tone: 'default' | 'glass' | 'muted' = 'default';

  get classes(): string[] {
    const base =
      'rounded-3xl border p-6 shadow-[0_20px_60px_-30px_rgba(68,45,15,0.18)] transition duration-200';
    const tones: Record<typeof this.tone, string> = {
      default: 'border-border bg-card text-card-foreground',
      glass: 'border-border/30 bg-white/55 text-card-foreground backdrop-blur-xl',
      muted: 'border-border bg-muted text-card-foreground',
    };

    return [base, tones[this.tone]];
  }
}
