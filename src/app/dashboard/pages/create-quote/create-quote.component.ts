import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-quote',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, FormsModule],
  templateUrl: './create-quote.component.html',
})
export default class CreateQuoteComponent {
  quoteUpObj: QuoteUpModel = new QuoteUpModel();
  // constructor(private router: Router){}

  loggedUser: any;
  quotes: any;

  constructor(private router: Router) {
    const localUser = localStorage.getItem('loggedUser');
    if (localUser != null) {
      this.loggedUser = JSON.parse(localUser);
    } else {
      this.loggedUser = false;
      this.router.navigateByUrl('/login');
    }
  }

  saveQuote() {
    const localQuotes = localStorage.getItem('quotes');
    if (localQuotes != null) {
      this.quotes = JSON.parse(localQuotes);
    } else {
      this.quotes = [];
    }
    const newQuote = { // Nuevo objeto a agregar
      name: this.loggedUser.name,
      estilista: this.quoteUpObj.estilista,
      fecha_reserva: this.quoteUpObj.fecha_reserva,
      peluqueria: this.quoteUpObj.peluqueria
    };
    this.quotes.push(newQuote);
    localStorage.setItem('quotes', JSON.stringify(this.quotes));
    this.router.navigateByUrl('/dashboard/quotes');
  }
}

export class QuoteUpModel {
  estilista: string;
  fecha_reserva: string;
  peluqueria: string;

  constructor() {
    this.estilista = '';
    this.fecha_reserva = '';
    this.peluqueria = '';
  }
}
