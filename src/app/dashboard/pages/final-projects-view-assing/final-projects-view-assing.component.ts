import { Component } from '@angular/core';
import { ModalComponent } from '../../../shared/modal/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../../services/projects/projects.service';
import { HttpClient } from '@angular/common/http';
import { SwitchService } from '../../../services/modal/switch.service';

@Component({
  selector: 'app-final-projects-view-assing',
  standalone: true,
  imports: [[CommonModule, RouterModule, FormsModule, ModalComponent]],
  templateUrl: './final-projects-view-assing.component.html',
})
export default class FinalProjectsViewAssingComponent {
  idProyecto: number = 0;
  asignacionProject: any;
  documentosProject: any;
  selectedFile: File | null = null;
  showModal: boolean = false;
  textModal: string = '';
  textContent: string = '';
  routerLinkBtn1: string = '';
  textBtn1: string = '';
  textBtn2: string = '';
  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private http: HttpClient,
    private modalSS: SwitchService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idProyecto = params['id'];
    });
    // Obtener asignacion del proyecto
    this.obtenerAsignacionProyecto();
    // Obtener asignacion del proyecto
    this.obtenerDocumentosProyecto();
    // Observable estado modal show o hidden
    this.modalSS.$modal.subscribe((valor) => { this.showModal = valor })
  }
  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedFile = (target.files as FileList)[0];
  }

  uploadFile(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      console.log(formData)
      this.http.post('http://localhost:3000/projects/upload', formData).subscribe(
        (response: any) => {
          this.saveDocumentProject(
            { pathOuput: response.pathOuput },
            { nameDocument: response.nameDocument }
          );
        },
        (error) => {
          this.openDialog('Error al guardar el archivo');
          console.error('Error al guardar el archivo', error);
        }
      );
    }
  }

  saveDocumentProject(pathOuput: any, nameDocument: any) {
    let dataInsert = {
      idProyecto: this.idProyecto,
      nombreArchivo: nameDocument.nameDocument,
      tipo: '.pdf',
      tamano: 100,
      rutaArchivo: pathOuput.pathOuput
    };
    this.projectsService.guardarDocumentoProyecto(dataInsert).subscribe((res: any) => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['dashboard/projects/viewAssign', this.idProyecto]);
        this.openDialog(res.status);
      });
    });
  }
  obtenerAsignacionProyecto() {
    this.projectsService.obtenerAsigancionProyecto({ idProyecto: this.idProyecto }).subscribe((res: any) => {
      this.asignacionProject = res;
    });
  }

  obtenerDocumentosProyecto() {
    this.projectsService.obtenerDocumentosProyecto({ idProyecto: this.idProyecto }).subscribe((res: any) => {
      this.documentosProject = res;
    });
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
