import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { routes } from '../../app.routes';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './sidemenu.component.html',
})
export class SidemenuComponent {
  public menuItems = routes
  .map( route => route.children ?? [] )
  .flat()
  .filter( route => route && route.path)
  .filter( route => !route.path?.includes(':'));
  loggedUser: any;

  constructor(private router: Router,@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        this.loggedUser = jwtDecode(token) as any;
      } 
    }
  }

  onLogoff() {
    localStorage.removeItem('token');
    this.loggedUser = false;
    this.router.navigateByUrl('/login');
  }
}
