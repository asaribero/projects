import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable } from 'rxjs';
import { ProjectResponse } from '../../interfaces/req-response';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private http = inject(HttpClient);
  private jwtHelper = inject(JwtHelperService);
  private URL = 'http://172.179.241.129:3000';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  obtenerProyectos(){
    return this.http.get(`${this.URL}/projects/all`);
  }

  guardarProyecto(proyecto:any){
    return this.http.post(`${this.URL}/projects/save`,proyecto);
  }

  obtenerProyecto(idProyecto:any){
    return this.http.get<ProjectResponse>(`${this.URL}/projects/getProject/${idProyecto}`)
    .pipe(
      map(resp => resp.data)
    );
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

  // Actualizar un proyecto existente
  updateProject(idProyecto: string, project: any): Observable<any> {
    return this.http.put(`${this.URL}/projects/update/${idProyecto}`, project);
  }

  // Elimianr un proyecto existente
  deleteProject(idProyecto: string): Observable<any> {
    return this.http.delete(`${this.URL}/projects/delete/${idProyecto}`);
  }
}
