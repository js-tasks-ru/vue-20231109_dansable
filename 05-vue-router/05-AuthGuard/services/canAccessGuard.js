import { isAuthenticated } from "./authService";

export function canAccessGuard(to) {
  const authed = isAuthenticated();

  if (authed && to.meta.requireGuest) {
    return { name: 'index' };
  }

  if (!authed && to.meta.requireAuth) {
    return { name: 'login', query: { from: to.fullPath } };
  }

  return true;
}
