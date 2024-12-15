import { Component, inject } from '@angular/core';
import { CategoriasService } from '../../../services/categorias/categorias.service';
import internal from 'stream';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../../services/projects/projects.service';
import { ModalComponent } from '../../../shared/modal/modal/modal.component';
import { SwitchService } from '../../../services/modal/switch.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { toSignal } from '@angular/core/rxjs-interop'
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-final-projects-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ModalComponent, ReactiveFormsModule],
  templateUrl: './final-projects-edit.component.html',
})
export default class FinalProjectsEditComponent {
  categorias: any;
  showModal: boolean = false;
  textModal: string = '';
  textContent: string = '';
  routerLinkBtn1: string = '';
  textBtn1: string = '';
  textBtn2: string = '';
  private route = inject(ActivatedRoute);
  private projectsService = inject(ProjectsService);
  private fb = inject(FormBuilder);
  projectForm: FormGroup;
  private router = inject(Router);

  public project = toSignal(
    this.route.params.pipe(
      switchMap(({ id }) => this.projectsService.obtenerProyecto(id).pipe(
        tap(response => console.log('Respuesta del servicio:', response))
      ))
    )
  );

  constructor(
    private categoriasService: CategoriasService,
    private modalSS: SwitchService
  ) { 
    this.projectForm = this.fb.group({
      titulo: ['', Validators.required],
      resumen: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      idCategoria: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    // Validar la modal show o hidden
    this.modalSS.$modal.subscribe((valor) => { this.showModal = valor })
    // Obtenre categorias
    this.cargarCategorias();

    const idProyecto = this.route.snapshot.paramMap.get('id');

    if (idProyecto) {
      this.loadProjectData(idProyecto);
    }
  }

  loadProjectData(id: string): void {
    this.projectsService.obtenerProyecto(id).subscribe(project => {
      const formatDate = (date: string | Date): string => {
        if (typeof date === 'string') return date.split('T')[0];
        return new Date(date).toISOString().split('T')[0];
      };
  
      this.projectForm.patchValue({
        titulo: project.titulo,
        resumen: project.resumen,
        fechaInicio: formatDate(project.fechaInicio), // Formatea la fecha
        fechaFin: formatDate(project.fechaFin),       // Formatea la fecha
        idCategoria: project.idCategoria        // Asigna ID al select
      });
    });
  }

  cargarCategorias(): void {
    this.categoriasService.obtenerCategorias().subscribe((res: any) => {
      this.categorias = res;
    });
  }

  onSave(): void {
    console.log(this.projectForm.controls['titulo'].value);
    console.log(this.projectForm.controls['resumen'].value);
    console.log(this.projectForm.controls['fechaInicio'].value);
    console.log(this.projectForm.controls['fechaFin'].value);
    console.log(this.projectForm.controls['idCategoria'].value);
    console.log(this.projectForm)
    this.projectForm.markAllAsTouched();

    if (this.projectForm.valid) {
      const idProyecto = this.route.snapshot.paramMap.get('id') ?? '';
      this.projectsService.updateProject(idProyecto, this.projectForm.value).subscribe(
        () => {
          Swal.fire({
            title: 'Actualización Exitosa',
            text: 'El proyecto ha sido actualizado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            customClass: {
              confirmButton: 'flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-dark transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:text-white hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600' // Aplica clase personalizada
            }
          }).then(() => {
            this.router.navigate(['/dashboard/projects']);
          });
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al actualizar el proyecto.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      );
    } else {
      Swal.fire({
        title: 'Formulario Inválido',
        text: 'Por favor, completa todos los campos requeridos.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  }

}