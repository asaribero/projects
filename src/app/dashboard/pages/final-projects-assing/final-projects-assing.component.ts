import { Component } from '@angular/core';
import { ModalComponent } from '../../../shared/modal/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../../services/projects/projects.service';
import { UsersService } from '../../../services/users/users.service';

@Component({
  selector: 'app-final-projects-assing',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ModalComponent],
  templateUrl: './final-projects-assing.component.html',
})
export default class FinalProjectsAssingComponent {
  saveObj: SaveModel = new SaveModel();
  textModal: string = '';
  textContent: string = '';
  showModal: boolean = false;
  idProyecto: number = 0;
  project: any;
  docentes: any;
  routerLinkBtn1: string = '';
  textBtn1: string = '';
  textBtn2: string = '';
  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private usersService : UsersService
  ) { }
  // Esta funcion s eejecuta siempre antes de cargar el componente
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idProyecto = params['id'];
    });
    this.obtenerProyecto();
    this.obtenerDocentes();
  }

  obtenerProyecto(): void {
    this.projectsService.obtenerProyecto({idProyecto:this.idProyecto}).subscribe( (res:any) => {
      this.project = res;
    });
  }
  obtenerDocentes(): void {
    this.usersService.obtenerDocentes().subscribe( (res:any) => {
      this.docentes = res;
    });
  }

  nuevaAsignacion(): void {
    if(this.saveObj.idUsuario != 0){
      let asignacion = {
        idUsuario : this.saveObj.idUsuario,
        idProyecto: this.idProyecto,
        rol:this.saveObj.rol
      };

      this.projectsService.guardarAsignacionProyecto(asignacion).subscribe((res: any) => {
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
export class SaveModel {
  idUsuario: number;
  rol: number;

  constructor() {
    this.idUsuario = 0;
    this.rol = 3;
  }
}