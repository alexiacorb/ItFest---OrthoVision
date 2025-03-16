import { Routes } from '@angular/router';
import { PaginaCreareContComponent } from "./pagina-creare-cont/pagina-creare-cont.component";
import { PaginaLogareComponent } from "./pagina-logare/pagina-logare.component";
import { AuthGuardService } from './auth-guard.service';
import { PaginaDiagnosticComponent } from './pagina-diagnostic/pagina-diagnostic.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'logare', // Redirecționează root-ul către /creareCont
    pathMatch: 'full'
  },
  {
    path: 'creareCont',
    component: PaginaCreareContComponent
  },
  {
    path: 'logare',
    component: PaginaLogareComponent
  },
  {
    path: 'diagnostic',
    component: PaginaDiagnosticComponent,
    canActivate: [AuthGuardService] 
  },
  { 
    path: '**', 
    redirectTo: 'logare', 
    pathMatch: 'full'
  }
];
