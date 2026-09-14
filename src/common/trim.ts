// Usado com @Transform: remove espacos das pontas de strings e mantem os demais valores.
export const trim = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;
