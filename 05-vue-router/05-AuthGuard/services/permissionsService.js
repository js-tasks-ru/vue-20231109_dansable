import { isAuthenticated } from "./authService";

export function canAccessOrRedirect(to) {
  const authed = isAuthenticated();
  const requireGuest = to.meta.requireGuest;
  const requireAuth = to.meta.requireAuth;

  if (authed && requireGuest) {
    return { name: 'index' };
  }

  if (authed && requireAuth) {
    return true;
  }

  if (!authed && requireAuth) {
    return { name: 'login', query: { from: to.fullPath } };
  }

  if (!authed && requireGuest) {
    return true;
  }

  return true;
}
