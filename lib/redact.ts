const EMAIL_PATTERN = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
const PHONE_PATTERN = /(?<!\d)(?:\+?972[-\s]?)?0?5\d(?:[-\s]?\d){7}(?!\d)/g;
const LONG_NUMBER_PATTERN = /(?<!\d)\d{7,9}(?!\d)/g;

export function redactSensitiveText(value: string) {
  return value
    .replace(EMAIL_PATTERN, "[EMAIL REDACTED]")
    .replace(PHONE_PATTERN, "[PHONE REDACTED]")
    .replace(LONG_NUMBER_PATTERN, "[NUMBER REDACTED]");
}

export function redactSensitiveValue<T>(value: T): T {
  if (typeof value === "string") return redactSensitiveText(value) as T;
  if (Array.isArray(value)) return value.map(item => redactSensitiveValue(item)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [key, redactSensitiveValue(item)])
    ) as T;
  }
  return value;
}
