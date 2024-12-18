import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private jwtHelper = inject(JwtHelperService);
  private URL = 'http://172.179.241.129:3000';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  singin(user:any){
    return this.http.post(`${this.URL}/user/signin`,user);
  }

  isAuth() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')) {
        return false;
      }
      return true;
    }
    // If not in a browser, handle accordingly
    return false;
  }
}
