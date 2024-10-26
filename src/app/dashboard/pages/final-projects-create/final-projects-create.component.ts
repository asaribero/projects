import { Component } from '@angular/core';
import { CategoriasService } from '../../../services/categorias/categorias.service';
import internal from 'stream';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../../services/projects/projects.service';
import { ModalComponent } from '../../../shared/modal/modal/modal.component';
import { SwitchService } from '../../../services/modal/switch.service';

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
    if(this.saveObj.titulo != '' && this.saveObj.resumen != '' && this.saveObj.idCategoria != 0){
      this.projectsService.guardarProyecto(this.saveObj).subscribe((res: any) => {
          this.openDialog(res.status);
      });
    }else{
      this.openDialog('No pueden haber campos vacios');
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