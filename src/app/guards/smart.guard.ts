import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const smartGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = false;

  if (isLoggedIn) {
    return true;
  }

  localStorage.setItem('redirectUrlAfterLogin', state.url);

  return router.createUrlTree(['/login']);
};
