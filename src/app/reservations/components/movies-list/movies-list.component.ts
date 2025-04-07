import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../models/movies.model';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  filterText = '';

  constructor(
    private moviesService: MoviesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  /** Carga todas las películas desde el servicio */
  private loadMovies(): void {
    this.moviesService.getMovies().subscribe(data => {
      this.movies = data;
      this.filteredMovies = data;
    });
  }

  /** Filtra por título */
  searchMovies(): void {
    const txt = this.filterText.trim().toLowerCase();
    this.filteredMovies = txt
      ? this.movies.filter(m => m.title.toLowerCase().includes(txt))
      : this.movies;
  }

  /** Elimina la película y recarga la lista */
  onDelete(movie: Movie): void {
    const ok = window.confirm(`¿Seguro que deseas eliminar "${movie.title}"?`);
    if (!ok) return;

    this.moviesService.deleteMovie(movie.pelicula_id)
      .subscribe({
        next: () => this.loadMovies(),
        error: err => alert('Error al eliminar: ' + err.message)
      });
  }
}
