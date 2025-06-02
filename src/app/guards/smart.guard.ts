import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const smartGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.user()) {
    return true;
  }

  localStorage.setItem('redirectUrlAfterLogin', state.url);

  return router.createUrlTree(['/login']);
};
