import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';

export const roleGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRole = route.data['expectedRole'];
  const token = localStorage.getItem('token');
  if (token) {
    const token_decode = jwtDecode(token) as any;
    const user = {
      userName:token_decode.nombre,
      roleId: token_decode.rol
    }
    if(!authService.isAuth() || user.roleId !== expectedRole){
      console.log('Usuario no autorizado para la vista');
      router.navigate(['login']);
      return false;
    }
    return true;
  } 
  return false;
};
