import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './pagina-creare-cont/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,
              private authService: AuthService) {}

  canActivate(): boolean {
    if (!this.authService.esteConectat()) {
      this.router.navigate(['/logare']);
      return false;
    }
    return true;
  }
}
