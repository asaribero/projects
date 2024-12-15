import { Component } from '@angular/core';
import { ModalComponent } from '../../../shared/modal/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../../services/projects/projects.service';
import { HttpClient } from '@angular/common/http';
import { SwitchService } from '../../../services/modal/switch.service';
import Swal from 'sweetalert2';

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
  private URL = 'http://172.179.241.129:3000';
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
      console.log(formData);
  
      this.http.post(`${this.URL}/projects/upload`, formData).subscribe(
        (response: any) => {
          this.saveDocumentProject(
            { pathOuput: response.pathOuput },
            { nameDocument: response.nameDocument }
          );
  
          // Muestra la alerta de éxito
          Swal.fire({
            title: '¡Archivo subido!',
            text: 'El archivo se ha subido exitosamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            customClass: {
              confirmButton: 'bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2',
            }
          });
        },
        (error) => {
          // Muestra una alerta en caso de error
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al subir el archivo.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
          console.error('Error al guardar el archivo', error);
        }
      );
    } else {
      // Alerta si no se selecciona archivo
      Swal.fire({
        title: 'Sin archivo',
        text: 'Por favor, selecciona un archivo para subir.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
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

  downloadFile(fileName: string): void {
    const url = `${this.URL}/projects/download/${fileName}`; // URL del backend
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
  
    // Simula el clic para iniciar la descarga
    link.click();
  
    // Espera un tiempo para asegurar que la descarga comienza, luego redirige
    setTimeout(() => {
      this.router.navigate([`/dashboard/projects/viewAssign/${this.idProyecto}`]); // Ruta a la vista inicial
    }, 1000); // Espera 1 segundo antes de redirigir
  }
}
