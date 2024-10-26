import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router,RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './sign-in.component.html',
})
export default class SignInComponent {
  signUpObj: SignUpModel = new SignUpModel();
  constructor(private router: Router){}

  onRegister() {
    // debugger;
    const localUser = localStorage.getItem('angular');
    if(localUser != null){
      const users = JSON.parse(localUser);
      users.push(this.signUpObj);
      localStorage.setItem('angular',JSON.stringify(users));
      this.router.navigateByUrl('/login');
    }else{
      const users = [];
      users.push(this.signUpObj);
      localStorage.setItem('angular',JSON.stringify(users));
      this.router.navigateByUrl('/sign-in');
    }
  }
  sendLogin() {
    this.router.navigateByUrl('/login');
  }
}
export class SignUpModel {
  name:string;
  email:string;
  password:string;

  constructor() {
    this.name = '';
    this.email = '';
    this.password = '';
  }
}