import { Component } from '@angular/core';
import { ModalComponent } from '../../../shared/modal/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../../services/projects/projects.service';
import { SwitchService } from '../../../services/modal/switch.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-final-projects-review-document',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ModalComponent],
  templateUrl: './final-projects-review-document.component.html',
})
export default class FinalProjectsReviewDocumentComponent {
  saveObj: SaveReviewDocumentModel = new SaveReviewDocumentModel();
  showModal: boolean = false;
  textModal: string = '';
  textContent: string = '';
  routerLinkBtn1: string = '';
  textBtn1: string = '';
  textBtn2: string = '';
  idDocumento: number = 0;
  revisionesDocumentos: any;

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private modalSS: SwitchService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idDocumento = params['idDocumento'];
    });
    // Validar la modal show o hidden
    this.modalSS.$modal.subscribe((valor) => { this.showModal = valor })
    this.obtenerRevisionesDocumento();
  }

  nuevaRevision(){
    if(this.saveObj.comentario != ''){
      let data = {
        idDocumento:this.idDocumento,
        idRevisor:1,
        fechaRevision:new Date(),
        comentarios:this.saveObj.comentario
      };
      this.projectsService.guardarComentarioDocumento(data).subscribe((res: any) => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['dashboard/projects/reviewDocument', this.idDocumento]);
          this.openDialog(res.status);
        });
      });
    }else{
      this.openDialog('No pueden haber campos vacios');
    }
  }

  obtenerRevisionesDocumento(){
    this.projectsService.obtenerRevisionesDocumento({ idDocumento: this.idDocumento }).subscribe((res: any) => {
      this.revisionesDocumentos = res;
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

export class SaveReviewDocumentModel {
  comentario: string;

  constructor() {
    this.comentario = '';
  }
}