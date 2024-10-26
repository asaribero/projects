import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private http = inject(HttpClient);
  private jwtHelper = inject(JwtHelperService);
  private URL = 'http://localhost:3000';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  obtenerProyectos(){
    return this.http.get(`${this.URL}/projects/all`);
  }

  guardarProyecto(proyecto:any){
    return this.http.post(`${this.URL}/projects/save`,proyecto);
  }

  obtenerProyecto(idProyecto:any){
    return this.http.post(`${this.URL}/projects/getProject`,idProyecto);
  }

  guardarAsignacionProyecto(asignacion:any){
    return this.http.post(`${this.URL}/projects/saveAssing`,asignacion);
  }

  obtenerAsigancionProyecto(idProyecto:any){
    return this.http.post(`${this.URL}/projects/getAssignProject`,idProyecto);
  }

  obtenerDocumentosProyecto(idProyecto:any){
    return this.http.post(`${this.URL}/projects/getDocumentsProject`,idProyecto);
  }

  guardarDocumentoProyecto(documento:any){
    return this.http.post(`${this.URL}/projects/saveDocumentProject`,documento);
  }

  guardarComentarioDocumento(comentarioDocumento:any){
    return this.http.post(`${this.URL}/projects/saveComentarioDocumento`,comentarioDocumento);
  }

  obtenerRevisionesDocumento(idDocumento:any){
    return this.http.post(`${this.URL}/projects/getRevisionesDocumento`,idDocumento);
  }
}
