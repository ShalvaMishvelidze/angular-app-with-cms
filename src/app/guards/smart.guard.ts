import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from '../services/cookie.service';

export const smartGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const cookieService = inject(CookieService);

  const user = cookieService.getCookie('user')
    ? JSON.parse(cookieService.getCookie('user')!)
    : null;

  if (cookieService.getCookie('token') && user) {
    return true;
  }

  localStorage.setItem('redirectUrlAfterLogin', state.url);

  return router.createUrlTree(['/login']);
};
