import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';

const guardPrivate = () => {
  const router = inject(Router);
  const isLoggedIn = false;

  if (isLoggedIn) {
    return true;
  }

  return router.createUrlTree(['/']);
};

export const privateGuard: CanActivateFn = (route, state) => guardPrivate();
export const privateChildrenGuard: CanActivateChildFn = (route, state) =>
  guardPrivate();
