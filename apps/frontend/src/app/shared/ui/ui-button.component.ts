import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: '[ui-button]',
  standalone: true,
  template: `<ng-content />`,
})
export class UiButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() variant: 'primary' | 'secondary' | 'ghost' = 'primary';

  @HostBinding('attr.type')
  get hostType(): string | null {
    return this.type;
  }

  @HostBinding('attr.disabled')
  get hostDisabled(): '' | null {
    return this.disabled ? '' : null;
  }

  @HostBinding('class')
  get hostClasses(): string {
    return this.classes.join(' ');
  }

  get classes(): string[] {
    const base =
      'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60';
    const variants: Record<typeof this.variant, string> = {
      primary: 'bg-amber-700 text-white shadow-lg shadow-amber-900/20 hover:bg-amber-800',
      secondary:
        'bg-stone-900 text-stone-50 shadow-lg shadow-stone-950/10 hover:bg-stone-800',
      ghost:
        'border border-amber-200 bg-white/80 text-amber-900 hover:border-amber-300 hover:bg-amber-50',
    };

    return [base, variants[this.variant]];
  }
}
