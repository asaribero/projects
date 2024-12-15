import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from 'express';
import { ProjectsService } from '../../../services/projects/projects.service';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ModalComponent } from '../../../shared/modal/modal/modal.component';
import { SwitchService } from '../../../services/modal/switch.service';
import { jwtDecode } from 'jwt-decode';

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
}
