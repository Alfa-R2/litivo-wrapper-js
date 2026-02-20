import z from 'zod';

function trimEnum<const T extends readonly [string, ...string[]]>(values: T) {
  return z.string().trim().pipe(z.enum(values));
}

function toSentenceCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

function sentenceEnum<const T extends readonly [string, ...string[]]>(values: T) {
  return z
    .string()
    .trim()
    .transform((val) => toSentenceCase(val))
    .pipe(z.enum(values));
}

function uppercaseEnum<const T extends readonly [string, ...string[]]>(values: T) {
  return z.string().trim().toUpperCase().pipe(z.enum(values));
}

export { sentenceEnum, trimEnum, uppercaseEnum };
