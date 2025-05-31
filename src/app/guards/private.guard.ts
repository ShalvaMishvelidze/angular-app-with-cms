import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const privateChildrenGuard: CanActivateChildFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = false;

  if (isLoggedIn) {
    return true;
  }

  return router.createUrlTree(['/']);
};
