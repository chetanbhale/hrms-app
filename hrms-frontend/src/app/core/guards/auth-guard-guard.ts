import { Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = Inject(Router);
  const token = sessionStorage.getItem('token');
  if(token){
    return true;
  }
  router.navigate(['/login'])
  return false;
};
