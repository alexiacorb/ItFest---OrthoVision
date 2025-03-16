import { Routes } from '@angular/router';
import { PaginaCreareContComponent } from "./pagina-creare-cont/pagina-creare-cont.component";
import { PaginaLogareComponent } from "./pagina-logare/pagina-logare.component";
import { AuthGuardService } from './auth-guard.service';
import { PaginaDiagnosticComponent } from './pagina-diagnostic/pagina-diagnostic.component';

export const routes: Routes = [
  {
    path: '',
    component: PaginaCreareContComponent,
    canActivate: [AuthGuardService] 
  },
  {
    path: 'creareCont',
    component: PaginaCreareContComponent,
    canActivate: [AuthGuardService] 
  },
  {
    path: 'logare',
    component: PaginaLogareComponent,
    canActivate: [AuthGuardService] 
  },
  {
    path: 'diagnostic',
    component: PaginaDiagnosticComponent
  },
  { 
    path: '**', 
    redirectTo: 'logare', 
    pathMatch: 'full',
  }
];
