import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }

  auth.clearSession('Você precisa estar autenticado para acessar esta página.');
  return router.createUrlTree(['/login'], { queryParams: { reason: 'auth' } });
};
