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
  private router = inject(Router);
  saveObj: SaveProjectModel = new SaveProjectModel();
  categorias: any;
  showModal: boolean = false;
  textModal: string = '';
  textContent: string = '';
  routerLinkBtn1: string = '';
  textBtn1: string = '';
  textBtn2: string = '';
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
    if (this.saveObj.titulo !== '' && this.saveObj.resumen !== '' && this.saveObj.idCategoria !== 0) {
      this.projectsService.guardarProyecto(this.saveObj).subscribe(
        (res: any) => {
          // Mostrar alerta de éxito
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: res.status,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.router.navigate(['/dashboard/projects']);
          });
        },
        (error) => {
          // Mostrar alerta de error en caso de fallo
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al guardar el proyecto. Intente de nuevo.',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Cerrar'
          });
        }
      );
    } else {
      // Mostrar alerta de advertencia si hay campos vacíos
      Swal.fire({
        icon: 'warning',
        title: 'Campos vacíos',
        text: 'No pueden haber campos vacíos. Complete todos los campos antes de guardar.',
        confirmButtonColor: '#f0ad4e',
        confirmButtonText: 'Entendido'
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