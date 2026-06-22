import { AbstractControl, FormGroup } from '@angular/forms';

export type FieldErrorResolver = (
  field: string,
  control: AbstractControl,
) => string | null;

export function collectFormFieldErrors(
  form: FormGroup,
  resolveFieldError: FieldErrorResolver,
): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const field of Object.keys(form.controls)) {
    const control = form.get(field);
    if (!control || !control.invalid) {
      continue;
    }

    const message = resolveFieldError(field, control);
    if (message) {
      errors[field] = message;
    }
  }

  return errors;
}

export function invalidFieldsMessage(): string {
  return 'Os campos inválidos devem ser corrigidos.';
}
