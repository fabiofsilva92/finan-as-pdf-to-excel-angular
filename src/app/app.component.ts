import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'financas-angular';


  selectedFile: File | null = null;

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedFile = (target.files as FileList).item(0);
    console.log(this.selectedFile);
  }

  onUpload(): void {
    if (this.selectedFile) {
      console.log('Enviando arquivo:', this.selectedFile.name);
      // Aqui você pode adicionar a lógica para enviar o arquivo para um servidor, por exemplo, usando o HttpClient
    } else {
      console.log('Nenhum arquivo selecionado.');
    }
  }
}
