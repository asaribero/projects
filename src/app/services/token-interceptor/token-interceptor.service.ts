import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const token = localStorage.getItem('token');
    let tokenHeader = req;
    
    if (token) {
      // Si hay un token, clonamos la petición y le añadimos el token de autorización.
      tokenHeader = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    
    // Devolvemos la petición, que puede o no haber sido modificada, al siguiente manejador.
    return next.handle(tokenHeader);
  }

}
