import { Component } from '@angular/core';
import { CreditoModule } from '../credito.module';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-credito',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule ],
  templateUrl: './credito.component.html',
  styleUrl: './credito.component.css'
})
export class CreditoComponent {
  selectedFile: File | null = null;
  bankValue: string = '';
  uploadURL: string = '';
  constructor(private http: HttpClient) {

    console.log("Entrou no construtor")
    this.http.get('/assets/config.json').subscribe((config: any) => {
      console.log("CONFIG -> "+config);
      this.uploadURL = config.uploadURL;
    });

  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedFile = (target.files as FileList).item(0);
    console.log(this.selectedFile);
  }

  onUpload(): void {
    if (this.selectedFile && this.bankValue) {

      console.log("Upload url = "+this.uploadURL)
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      formData.append('bank', this.bankValue);

      //const uploadURL = 'http://localhost:8080/process'; // Substitua pela URL da sua API

      this.http.post(this.uploadURL, formData, { observe: 'response', responseType: 'blob' }).subscribe(
        (httpResponse) => {
          // Agora a resposta é um objeto HttpResponse, e o corpo é acessado via httpResponse.body
          const blob: Blob = httpResponse.body!;
          // Acessando os cabeçalhos diretamente do objeto de resposta
          const contentDisposition = httpResponse.headers.get('Content-Disposition') || "";
          const filenameRegex = /filename=([^;]+)/;
          const matches = contentDisposition.match(filenameRegex);
          const filename = matches && matches.length > 1 ? matches[1].trim() : 'default.xlsx';
          // Criar um link temporário para download
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = filename.replace(/['"]/g, ''); // Remove possíveis aspas do nome do arquivo
          document.body.appendChild(link);
          link.click();

          // Limpeza
          document.body.removeChild(link);
          URL.revokeObjectURL(link.href);

          console.log('Download iniciado:', filename);
        },
        (error) => console.error('Erro no upload:', error)
      );
    } else {
      console.log('Nenhum arquivo selecionado ou nome do banco não fornecido.');
    }
  }
}
