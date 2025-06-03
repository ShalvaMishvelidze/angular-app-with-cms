import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const privateChildrenGuard: CanActivateChildFn = (route, state) => {
  const router = inject(Router);

  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

  if (localStorage.getItem('token') && user && user.role === 'admin') {
    return true;
  }

  return router.createUrlTree(['/']);
};
