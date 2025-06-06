import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const smartGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

  if (localStorage.getItem('token') && user) {
    return true;
  }

  localStorage.setItem('redirectUrlAfterLogin', state.url);

  return router.createUrlTree(['/login']);
};
