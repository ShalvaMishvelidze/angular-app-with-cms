import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const adminGuard: CanActivateChildFn = (route, state) => {
  const router = inject(Router);

  router.navigate(['/']);
  return false;
};
