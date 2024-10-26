import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient);
  private jwtHelper = inject(JwtHelperService);
  private URL = 'http://localhost:3000';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  obtenerDocentes(){
    return this.http.get(`${this.URL}/user/docentes`);
  }

  obtenerUsuarios(){
    return this.http.get(`${this.URL}/user`);
  }
}
