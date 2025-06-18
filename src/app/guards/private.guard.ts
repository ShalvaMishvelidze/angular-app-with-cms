import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { CookieService } from '../services/cookie.service';

export const privateChildrenGuard: CanActivateChildFn = (route, state) => {
  const router = inject(Router);
  const cookieService = inject(CookieService);

  const user = cookieService.getCookie('user')
    ? JSON.parse(cookieService.getCookie('user')!)
    : null;

  if (
    cookieService.getCookie('token') &&
    user &&
    (user.role === 'seller' || user.role === 'admin')
  ) {
    return true;
  }

  return router.createUrlTree(['/']);
};
