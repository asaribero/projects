import { Component, inject } from '@angular/core';
import { ModalComponent } from '../../../shared/modal/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../../services/projects/projects.service';
import { UsersService } from '../../../services/users/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-final-projects-assing',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ModalComponent],
  templateUrl: './final-projects-assing.component.html',
})
export default class FinalProjectsAssingComponent {
  private router = inject(Router);
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
    if (this.saveObj.idUsuario !== 0) {
      let asignacion = {
        idUsuario: this.saveObj.idUsuario,
        idProyecto: this.idProyecto,
        rol: this.saveObj.rol
      };
  
      this.projectsService.guardarAsignacionProyecto(asignacion).subscribe(
        (res: any) => {
          this.openDialog(res.status, true);
        },
        (error) => {
          this.openDialog('Error al guardar la asignación. Intente de nuevo.', false);
        }
      );
    } else {
      this.openDialog('No pueden haber campos vacíos', false);
    }
  }
  
  openDialog(message: string, isSuccess: boolean): void {
    if (isSuccess) {
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: message,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        this.router.navigate(['/dashboard/projects']);
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Cerrar'
      });
    }
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