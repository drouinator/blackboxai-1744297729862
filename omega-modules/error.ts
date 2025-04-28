export function handleError(error: any): string {
  if (!error) return 'Unknown error';
  return error.message || String(error);
}
