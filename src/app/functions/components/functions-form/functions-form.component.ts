import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MoviesService } from '../../../movies/services/movies.service';
import { RoomsService } from '../../../rooms/services/rooms.service';
import { FunctionsService } from '../../services/functions.service';
import { Movie } from '../../../movies/models/movies.model';
import { Room } from '../../../rooms/models/rooms.model';
import { FunctionModel } from '../../models/functions.model';

declare const Swal: any;

@Component({
  selector: 'app-functions-form',
  templateUrl: './functions-form.component.html',
  styleUrls: ['./functions-form.component.css'],
})
export class FunctionsFormComponent implements OnInit {
  functionForm: FormGroup;
  movies: Movie[] = [];
  rooms: Room[] = [];

  constructor(
    private fb: FormBuilder,
    private moviesService: MoviesService,
    private roomsService: RoomsService,
    private functionsService: FunctionsService
  ) {
    this.functionForm = this.fb.group({
      movie_id: ['', Validators.required],
      room_id: ['', Validators.required],
      schedule: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadMovies();
    this.loadRooms();
  }

  loadMovies(): void {
    this.moviesService.getMovies().subscribe(data => {
      this.movies = data;
    });
  }

  loadRooms(): void {
    this.roomsService.getRooms().subscribe(data => {
      this.rooms = data;
    });
  }

  onSubmit(): void {
    if (this.functionForm.valid) {
      const newFunction = this.functionForm.value as FunctionModel;
      this.functionsService.createFunction(newFunction).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Función registrada correctamente.',
            confirmButtonText: 'Aceptar'
          });
          this.functionForm.reset();
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