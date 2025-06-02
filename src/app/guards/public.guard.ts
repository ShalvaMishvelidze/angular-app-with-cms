import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { toObservable } from '@angular/core/rxjs-interop';

export const publicGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const user = toObservable(authService.user);

  user.subscribe((u) => {
    if (u) {
      console.warn('Authentication is still pending');
    } else {
      console.log('Authentication check completed');
      router.navigate(['/']);
    }
  });

  return true;
};
