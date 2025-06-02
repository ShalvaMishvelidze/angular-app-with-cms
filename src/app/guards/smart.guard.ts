import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take } from 'rxjs';

export const smartGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const user$ = toObservable(authService.user);

  return user$.pipe(
    filter((user) => user !== null),
    take(1),
    map((user) => {
      if (user) {
        return true;
      }
      localStorage.setItem('redirectUrlAfterLogin', state.url);

      return router.createUrlTree(['/login']);
    })
  );
};
