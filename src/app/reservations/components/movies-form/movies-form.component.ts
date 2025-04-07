import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MoviesService } from '../../services/movies.service';
declare const Swal: any;

@Component({
  selector: 'app-movie-form',
  templateUrl: './movies-form.component.html',
  styleUrls: ['./movies-form.component.css'],
})
export class MovieFormComponent {
  movieForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private moviesService: MoviesService
  ) {
    this.movieForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      genre: ['', Validators.required],
      duration: [null, [Validators.required, Validators.min(1)]],
      rating: ['', Validators.required]
    });
  }

  get title() {
    return this.movieForm.get('title');
  }
  get genre() {
    return this.movieForm.get('genre');
  }
  get duration() {
    return this.movieForm.get('duration');
  }
  get rating() {
    return this.movieForm.get('rating');
  }

  onSubmit(): void {
    if (this.movieForm.valid) {
      const newMovie = this.movieForm.value;
      this.moviesService.createMovie(newMovie as any).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Película registrada correctamente.',
            confirmButtonText: 'Aceptar'
          });
          this.movieForm.reset();
        },
        error: err => {
          Swal.fire({
            icon: 'error',
            title: 'Error al registrar',
            text: err.message,
            confirmButtonText: 'Aceptar'
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario inválido',
        text: 'Por favor corrige los errores antes de enviar.',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}
