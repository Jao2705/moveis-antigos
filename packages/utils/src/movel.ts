export const COMMON_MOVEL_TYPES = [
  'Sofá',
  'Mesa de centro',
  'Rack',
  'Estante',
  'Prateleira',
  'Poltrona',
  'Armário',
  'Mesa',
  'Suporte',
  'Cama',
  'Guarda roupa',
  'Espelho',
  'Cômoda',
  'Escrivaninha',
  'Banco',
  'Puff',
  'Painel',
  'Varal',
] as const;

const NON_ALPHANUMERIC = /[^a-z0-9]+/g;

function normalizeMovelType(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(NON_ALPHANUMERIC, ' ')
    .replace(/\s+/g, ' ');
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function isCommonMovelType(value: string): boolean {
  const normalizedValue = normalizeMovelType(value);
  if (!normalizedValue) {
    return false;
  }

  return COMMON_MOVEL_TYPES.some((item) => {
    const normalizedItem = normalizeMovelType(item);
    const pattern = new RegExp(
      `(^|[^a-z0-9])${escapeRegExp(normalizedItem)}([^a-z0-9]|$)`,
    );
    return pattern.test(normalizedValue);
  });
}

export function commonMovelTypeExamples(): string {
  return COMMON_MOVEL_TYPES.slice(0, 4).join(', ');
}
