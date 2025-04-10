export function hasPermission(user: any = {}, permission: string): boolean {
  return Array.isArray(user.permissions) && user.permissions.includes(permission);
}
