import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if(!authService.isAuth()){
    console.log('el token no es valdio o ya expiro')
    router.navigate(['login']);
    return false;
  }else{
    return true;
  }
};
