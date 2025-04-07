import { environment } from '../../../environments/environment.development';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Room } from '../models/rooms.model';

@Injectable({
  providedIn: 'root'
})
export class RoomsService  {

  public apiUrl: string = environment.baseUrl + 'rooms/';

  constructor(private http: HttpClient) {}

  /// GET ALL
  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // CREATE
  createRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(this.apiUrl, room).pipe(
      catchError(this.handleError)
    );
  }

  // UPDATE
  updateRoom(room_id: string, room: Room): Observable<Room> {
    const url = `${this.apiUrl}/${room_id}`;
    return this.http.put<Room>(url, room).pipe(
      catchError(this.handleError)
    );
  }

  // DELETE
  deleteRoom(room_id: string): Observable<void> {
    const url = `${this.apiUrl}/${room_id}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error en MoviesService:', error);
    return throwError(() => new Error('Ocurrió un error en la operación de películas.'));
  }
}