export interface UserResponse {
    data: User;
    support: Support;
}

export interface User {
    idUsuario : number;
    nombre : string;
    email : string;
    rol : number;
    contrasena : string;
}

export interface Support {
    url: string;
    text: string;
}


export interface ProjectResponse {
    data: Project;
    support: Support;
}

export interface Project {
    idProyecto : number;
    titulo : string;
    resumen : string;
    fechaInicio : Date;
    fechaFin : Date;
    idCategoria : number;
}