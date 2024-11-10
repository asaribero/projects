import { Component, inject, Input } from '@angular/core';
import { ModalComponent } from '../../../shared/modal/modal/modal.component';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { toSignal } from '@angular/core/rxjs-interop'
import { switchMap, tap } from 'rxjs';
import { UsersService } from '../../../services/users/users.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, FormsModule, ReactiveFormsModule,  ModalComponent, SweetAlert2Module],
  templateUrl: './user-form.component.html'
})
export default class UserFormComponent {
  private route = inject(ActivatedRoute);
  private usersService = inject(UsersService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  @Input() isEditMode = false;
  userForm: FormGroup;

  public user = toSignal(
    this.route.params.pipe(
      switchMap(({ id }) => this.usersService.getUserbyId(id).pipe(
        tap(response => console.log('Respuesta del servicio:', response))
      ))
    )
  );

  constructor(
  ) {
    this.userForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      rol: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!userId; // `isEditMode` será `true` si `userId` tiene valor
    
    if (this.isEditMode) {
      if (userId) {
        this.loadUserData(userId);
      }
    }
  }

  loadUserData(id: string): void {
    this.usersService.getUserbyId(id).subscribe(user => {
      this.userForm.patchValue({
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
        contrasena: user.contrasena
      });
    });
  }

  onSave(): void {
    if (this.userForm.valid) {
      if (this.isEditMode) {
        const userId = this.route.snapshot.paramMap.get('id') ?? '';
        this.usersService.updateUser(userId, this.userForm.value).subscribe(
          () => {
            Swal.fire({
              title: 'Actualización Exitosa',
              text: 'El usuario ha sido actualizado correctamente.',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              customClass: {
                confirmButton: 'flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-dark transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:text-white hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600' // Aplica clase personalizada
              }
            }).then(() => {
              this.router.navigate(['/dashboard/users']);
            });
          },
          (error) => {
            Swal.fire({
              title: 'Error',
              text: 'Ocurrió un error al actualizar el usuario.',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        );
      } else {
        this.usersService.createUser(this.userForm.value).subscribe(
          () => {
            Swal.fire({
              title: 'Creación Exitosa',
              text: 'El usuario ha sido creado correctamente.',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              customClass: {
                confirmButton: 'flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-dark transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:text-white hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600' // Aplica clase personalizada
              }
            }).then(() => {
              this.router.navigate(['/dashboard/users']);
            });
          },
          (error) => {
            Swal.fire({
              title: 'Error',
              text: 'Ocurrió un error al crear el usuario.',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        );
      }
    } else {
      Swal.fire({
        title: 'Formulario Inválido',
        text: 'Por favor, completa todos los campos requeridos.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}

