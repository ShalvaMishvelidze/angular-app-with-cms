import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from '../services/cookie.service';

export const publicGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const cookieService = inject(CookieService);

  if (cookieService.getCookie('token')) {
    return router.createUrlTree(['/']);
  }

  return true;
};
