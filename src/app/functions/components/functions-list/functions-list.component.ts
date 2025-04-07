import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FunctionsService } from '../../services/functions.service';
import { MoviesService } from '../../../movies/services/movies.service';
import { RoomsService } from '../../../rooms/services/rooms.service';
import { FunctionModel } from '../../models/functions.model';
import { Movie } from '../../../movies/models/movies.model';
import { Room } from '../../../rooms/models/rooms.model';

@Component({
  selector: 'app-functions-list',
  templateUrl: './functions-list.component.html',
  styleUrls: ['./functions-list.component.css']
})

export class FunctionsListComponent implements OnInit {
  functions: FunctionModel[] = [];
  filteredFunctions: FunctionModel[] = [];
  filterText = '';
  movies: Movie[] = [];
  rooms: Room[] = [];

  constructor(
    private functionsService: FunctionsService,
    private moviesService: MoviesService,
    private roomsService: RoomsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  /** Carga todas las funciones desde el servicio */
  loadData(): void {
    this.functionsService.getFunctions().subscribe(funcs => {
      this.functions = funcs;
      this.filteredFunctions = funcs;
  
      this.moviesService.getMovies().subscribe(movies => {
        this.movies = movies;
  
        this.roomsService.getRooms().subscribe(rooms => {
          this.rooms = rooms;
  
          // Vincular objetos de movie y room a cada función
          this.functions.forEach(fn => {
            fn.movie = this.movies.find(m => m.pelicula_id === fn.movie_id);
            fn.room = this.rooms.find(r => r.sala_id === fn.room_id);
          });
  
          // Aplicar filtrado si ya había texto
          if (this.filterText) this.searchFunctions();
        });
      });
    });
  }
  

  searchFunctions(): void {
    const txt = this.filterText.trim().toLowerCase();
    this.filteredFunctions = txt
      ? this.functions.filter(f => f.movie?.title?.toLowerCase().includes(txt))
      : [...this.functions];
  }

  onDelete(fn: FunctionModel): void {
    const ok = window.confirm(
      `¿Seguro que deseas eliminar la función de "${fn.movie?.title}" en la sala "${fn.room?.name}"?`
    );
    if (!ok) return;

    this.functionsService.deleteFunction(fn.funcion_id).subscribe({
      next: () => this.loadData(),
      error: err => alert('Error al eliminar: ' + err.message)
    });
  }
}
