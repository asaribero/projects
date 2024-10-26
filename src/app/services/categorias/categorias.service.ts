import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private http = inject(HttpClient);
  private jwtHelper = inject(JwtHelperService);
  private URL = 'http://localhost:3000';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  obtenerCategorias(){
    return this.http.get(`${this.URL}/categorias/all`);
  }
}