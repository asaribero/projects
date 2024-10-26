import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router,RouterLink, RouterModule } from '@angular/router';
import { SignUpModel } from '../sign-in/sign-in.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterModule,RouterLink,FormsModule],
  templateUrl: './login.component.html',
})
export default class LoginComponent {
  loginObj: LoginModel = new LoginModel();
  user :any;
  constructor(private router: Router,private authService: AuthService){}
  onLogin() {
    const email = this.loginObj.email;
    const password = this.loginObj.password;
    this.user = {
      userName: email,
      pass: password 
    }
    this.authService.singin(this.user).subscribe( (res:any) => {
      localStorage.setItem('token',res.token);
      this.router.navigate(['dashboard/projects']);
    });
  }

  sendSignIn() {
    this.router.navigate(['sign-in']);
  }
}

export class LoginModel {
  email:string;
  password:string;

  constructor() {
    this.email = '';
    this.password = '';
  }
}