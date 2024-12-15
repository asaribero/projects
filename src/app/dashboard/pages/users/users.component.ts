import { Component } from '@angular/core';
import { ModalComponent } from '../../../shared/modal/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../services/users/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, FormsModule,ModalComponent],
  templateUrl: './users.component.html',
})
export default class UsersComponent {
  users:any;
  constructor(private usersService:UsersService){}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(){
    this.usersService.obtenerUsuarios().subscribe( (res:any) => {
      this.users = res;
    });
  }

  onDelete(idUsuario: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService.deleteUser(idUsuario).subscribe(
          () => {
            Swal.fire('Eliminado', 'El proyecto ha sido eliminado correctamente', 'success');
            this.obtenerUsuarios(); // Vuelve a cargar la lista de proyectos
          },
          (error) => {
            console.error('Error al eliminar el proyecto:', error);
            Swal.fire('Error', 'No se pudo eliminar el proyecto', 'error');
          }
        );
      }
    });
  }
}
