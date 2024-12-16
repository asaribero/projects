import { Component, inject } from '@angular/core';
import { CategoriasService } from '../../../services/categorias/categorias.service';
import internal from 'stream';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../../services/projects/projects.service';
import { ModalComponent } from '../../../shared/modal/modal/modal.component';
import { SwitchService } from '../../../services/modal/switch.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-final-projects-create',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ModalComponent],
  templateUrl: './final-projects-create.component.html',
})
export default class FinalProjectsCreateComponent {
  saveObj: SaveProjectModel = new SaveProjectModel();
  categorias: any;
  showModal: boolean = false;
  textModal: string = '';
  textContent: string = '';
  routerLinkBtn1: string = '';
  textBtn1: string = '';
  textBtn2: string = '';
  private router = inject(Router);
  constructor(
    private categoriasService: CategoriasService,
    private projectsService: ProjectsService,
    private modalSS: SwitchService
  ) { }
  ngOnInit(): void {
    // Validar la modal show o hidden
    this.modalSS.$modal.subscribe((valor) => { this.showModal = valor })
    // Obtenre categorias
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoriasService.obtenerCategorias().subscribe((res: any) => {
      this.categorias = res;
    });
  }

  nuevoProyecto(): void {
    if (this.saveObj.titulo != '' && this.saveObj.resumen != '' && this.saveObj.idCategoria != 0) {
      this.projectsService.guardarProyecto(this.saveObj).subscribe(
        (res: any) => {
          Swal.fire({
            title: 'Éxito',
            text: 'Proyecto guardado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          }).then(() => {
            // Redirigir después de aceptar
            this.router.navigate(['/dashboard/projects']);
          });
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al guardar el proyecto.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      );
    } else {
      Swal.fire({
        title: 'Campos vacíos',
        text: 'No pueden haber campos vacíos.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  }
  openDialog(message: string): void {
    this.textModal = message;
    this.textContent = message;
    this.routerLinkBtn1 = '';
    this.textBtn1 = '';
    this.textBtn2 = '';
    this.showModal = true;
  }

}

export class SaveProjectModel {
  titulo: string;
  resumen: string;
  fechaInicio: Date;
  fechaFin: Date;
  idCategoria: number;
  estado: string;

  constructor() {
    this.titulo = '';
    this.resumen = '';
    this.fechaInicio = new Date();
    this.fechaFin = new Date();
    this.idCategoria = 0;
    this.estado = '1';
  }
}