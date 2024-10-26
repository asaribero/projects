import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, FormsModule],
  templateUrl: './quotes.component.html',
})
export default class QuotesComponent {
  loggedUser: any;
  localquotes: any

  constructor(private router: Router) {
      // const localUser = localStorage.getItem('loggedUser');
      // if (localUser != null) {
      //   this.loggedUser = JSON.parse(localUser);
      // } else {
      //   this.loggedUser = false;
      //   this.router.navigateByUrl('/login');
      // }

      // const quotes = localStorage.getItem('quotes');
      // if (quotes != null) {
      //   this.localquotes = JSON.parse(quotes);
      // } else {
      //   this.localquotes = false;
      // }
  }

}
