import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-pagina-diagnostic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagina-diagnostic.component.html',
  styleUrl: './pagina-diagnostic.component.scss'
})
export class PaginaDiagnosticComponent {

  constructor(private http: HttpClient) {}

  fisier: File | null = null;
  rezultat: string = ''; 

  fisierUploadat(event: any): void {
    this.fisier = event.target.files[0];
  }

  onSubmit(): void {
    try {
      if (this.fisier) {
        const formData = new FormData();
        formData.append('file', this.fisier, this.fisier.name);

        const apiDiagnostic = ' http://127.0.0.1:8000/predict';

        this.http.post<{ predictie: string }>(apiDiagnostic, formData).subscribe(
          (response) => {
            this.rezultat = response.predictie;  
            if(response.predictie == "Fractured")
              this.rezultat = "Nefracturat";
            else
              this.rezultat = "Fracturat";
            console.log('Predicted class:', this.rezultat);
          },
          (error) => {
            console.error('Error during prediction:', error);
          }
        );
      }
    }
    catch (error) {
      console.error('Error in form submission:', error);
    }
  }
}
