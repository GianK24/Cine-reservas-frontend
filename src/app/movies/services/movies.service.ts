import { environment } from '../../../environments/environment.development';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Movie } from '../models/movies.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  public apiUrl: string = environment.baseUrl + 'movies/';

  constructor(private http: HttpClient) {}

  // GET ALL
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // CREATE (POST)
  createMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.apiUrl, movie).pipe(
      catchError(this.handleError)
    );
  }

  // UPDATE (PUT)
  updateMovie(pelicula_id: string, movie: Movie): Observable<Movie> {
    const url = `${this.apiUrl}${pelicula_id}`;
    return this.http.put<Movie>(url, movie).pipe(
      catchError(this.handleError)
    );
  }

  // DELETE
  deleteMovie(pelicula_id: string): Observable<void> {
    const url = `${this.apiUrl}${pelicula_id}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error en MoviesService:', error);
    return throwError(() => new Error('Ocurrió un error en la operación de películas.'));
  }
}