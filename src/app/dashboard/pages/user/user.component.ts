import { Component, inject, signal } from '@angular/core';
import { ModalComponent } from '../../../shared/modal/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import type { User } from '../../../interfaces/req-response';

import { toSignal } from '@angular/core/rxjs-interop'
import { switchMap } from 'rxjs';
import { UsersService } from '../../../services/users/users.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, FormsModule,ModalComponent],
  templateUrl: './user.component.html',
})
export default class UserComponent {

  private route = inject(ActivatedRoute);
  private usersService = inject(UsersService);

  public user = toSignal(
    this.route.params.pipe(
      switchMap( ({id}) => this.usersService.getUserbyId( id ) )
    )
  )

  constructor() {

  }
}

