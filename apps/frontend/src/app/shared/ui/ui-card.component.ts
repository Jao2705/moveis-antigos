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
      'rounded-3xl border p-6 shadow-[0_20px_60px_-30px_rgba(68,45,15,0.35)] transition duration-200';
    const tones: Record<typeof this.tone, string> = {
      default: 'border-amber-200 bg-white text-stone-900',
      glass: 'border-white/30 bg-white/70 text-stone-900 backdrop-blur-xl',
      muted: 'border-stone-200 bg-stone-50 text-stone-900',
    };

    return [base, tones[this.tone]];
  }
}
