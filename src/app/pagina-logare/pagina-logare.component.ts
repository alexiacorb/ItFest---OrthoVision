import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from "@angular/router";
import { AuthService } from "../pagina-creare-cont/auth.service";
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-pagina-logare',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    RouterOutlet
  ],
  templateUrl: './pagina-logare.component.html',
  styleUrls: ['./pagina-logare.component.scss']
})
export class PaginaLogareComponent implements OnInit {

public numeUtilizator: string = '';

 seIncarcaPagina: boolean = true;

  form: any = {
    username: '',
    password: ''
  };

  mesaj: string  = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authService.esteConectat()) {
      this.router.navigate(['/cautareBilete']);
      return false;
    }
    this.seIncarcaPagina = false;
    return true;
  }


  onSubmit(): void {
    this.authService.logare(this.form).subscribe({
      next: (data) => {
        const token = data.token;
        if(token) {
          this.authService.salvareUsername(this.form.username);
          this.authService.salvareToken(token);
          this.numeUtilizator = this.form.username;
          this.router.navigate(['/cautareBilete']);
        }
      },
      error: () => {
        this.mesaj = 'Username sau parola incorecte';
        }
    });
  }
}
