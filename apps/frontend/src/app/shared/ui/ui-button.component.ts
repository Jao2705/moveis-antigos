import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: '[ui-button]',
  standalone: true,
  template: `<ng-content />`,
})
export class UiButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() variant: 'primary' | 'secondary' | 'ghost' | 'destructive' = 'primary';

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
      'inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60';
    const variants: Record<typeof this.variant, string> = {
      primary: 'border-transparent bg-primary text-primary-foreground shadow-lg shadow-primary/15 hover:bg-primary-hover',
      secondary:
        'border-border bg-muted text-foreground hover:bg-card hover:shadow-[0_10px_30px_-20px_rgba(68,45,15,0.2)]',
      ghost:
        'border-border bg-surface/80 text-foreground hover:bg-muted hover:border-primary/30',
      destructive:
        'border-transparent bg-destructive text-destructive-foreground shadow-lg shadow-destructive/15 hover:bg-destructive/90',
    };

    return [base, variants[this.variant]];
  }
}
