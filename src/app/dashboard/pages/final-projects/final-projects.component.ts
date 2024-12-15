import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from 'express';
import { ProjectsService } from '../../../services/projects/projects.service';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ModalComponent } from '../../../shared/modal/modal/modal.component';
import { SwitchService } from '../../../services/modal/switch.service';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-final-projects',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, FormsModule,ModalComponent],
  templateUrl: './final-projects.component.html',
  styleUrl: './final-projects.component.css'
})
export default class FinalProjectsComponent {
  projects: any;
  loggedUser: any;
  user:any;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,private projectsService: ProjectsService,private modalSS:SwitchService){
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');

      if (token) {
        this.loggedUser = jwtDecode(token) as any;
        this.user = {
          userName: this.loggedUser.nombre,
          roleId:  this.loggedUser.rol
        }
      } 
    }
  }
  ngOnInit(): void {
    // Cargar los proyectos para visualizarlos en la tabla
    this.cargarProyectos();
    // observable de la modal
    this.modalSS.$modal.subscribe((valor) => {this.showModal = valor})
  }
  
  cargarProyectos(): void {
    this.projectsService.obtenerProyectos().subscribe( (res:any) => {
      this.projects = res;
    });
  }

  showModal: boolean = false;

  openModal() {
    this.showModal = true;
  }

  onDelete(idProyecto: string): void {
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
        this.projectsService.deleteProject(idProyecto).subscribe(
          () => {
            Swal.fire('Eliminado', 'El proyecto ha sido eliminado correctamente', 'success');
            this.cargarProyectos(); // Vuelve a cargar la lista de proyectos
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
