export function connect(service: string): boolean {
  const available = ['db', 'cache', 'api'];
  return available.includes(service);
}
