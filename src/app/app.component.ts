import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Movie Reservation';
  formularioVisible: string | null = null;

  mostrarFormulario(formulario: string): void {
    this.formularioVisible = formulario;
  }
}
