import { Routes } from '@angular/router';
import path from 'path';
import { title } from 'process';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
    {
        path:'dashboard',
        loadComponent : () => import('./dashboard/dashboard.component'),
        canActivate:[authGuard],
        children: [
            {           
                path: 'user/:id',
                title: 'Ver usuario',
                loadComponent : () => import('./dashboard/pages/user/user.component'),
            },
            {           
                path: 'users',
                title: 'Usuarios',
                loadComponent : () => import('./dashboard/pages/users/users.component'),
                canActivate:[roleGuard],
                data: {expectedRole:'1'}
            },
            {           
                path: 'projects',
                title: 'Lista proyectos',
                loadComponent : () => import('./dashboard/pages/final-projects/final-projects.component'),
            },
            {           
                path: 'projects/create',
                title: 'Nuevo proyecto',
                loadComponent : () => import('./dashboard/pages/final-projects-create/final-projects-create.component'),
            },
            {           
                path: 'projects/assign/:id',
                title: 'Asignar docente',
                loadComponent : () => import('./dashboard/pages/final-projects-assing/final-projects-assing.component'),
            },
            {           
                path: 'projects/viewAssign/:id',
                title: 'Ver asignacion',
                loadComponent : () => import('./dashboard/pages/final-projects-view-assing/final-projects-view-assing.component'),
            },
            {           
                path: 'projects/reviewDocument/:idDocumento',
                title: 'Revisar documento',
                loadComponent : () => import('./dashboard/pages/final-projects-review-document/final-projects-review-document.component'),
            },
            {
                path: '',
                redirectTo:'users',
                pathMatch: 'full'
            }
        ]
    },
    {
        path:'login',
        loadComponent : () => import('./login/login.component'),
    },
    {
        path: 'sign-in',
        loadComponent : () => import('./sign-in/sign-in.component'),
    },
    {
        path:'',
        redirectTo : '/login',
        pathMatch: 'full'
    }
];
