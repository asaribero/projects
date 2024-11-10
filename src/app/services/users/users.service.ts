import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable } from 'rxjs';
import type { UserResponse } from '../../interfaces/req-response';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient);
  private jwtHelper = inject(JwtHelperService);
  private URL = 'http://localhost:3000';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  // Obtener usuario por ID
  getUserbyId(id: string) {
    return this.http.get<UserResponse>(`${this.URL}/user/userByParams/${id}`)
    .pipe(
      map(resp => resp.data)
    );
  }
  // Crear un nuevo usuario
  createUser(user: any): Observable<any> {
    return this.http.post(`${this.URL}/user/create`, user);
  }

  // Actualizar un usuario existente
  updateUser(id: string, user: any): Observable<any> {
    return this.http.put(`${this.URL}/user/update/${id}`, user);
  }

  // Ejemplo de otros métodos existentes
  obtenerDocentes(): Observable<any> {
    return this.http.get(`${this.URL}/user/docentes`);
  }

  obtenerUsuarios(): Observable<any> {
    return this.http.get(`${this.URL}/user`);
  }
}