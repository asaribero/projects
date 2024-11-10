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