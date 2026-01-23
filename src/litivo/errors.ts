/**
 * Example error handling module.
 */

export function handleError(err: unknown): void {
  console.error('Unhandled error:', err);
  process.exit(1);
}
