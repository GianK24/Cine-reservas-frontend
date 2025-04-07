import { environment } from '../../../environments/environment.development';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Reservation } from '../models/reservations.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  public apiUrl: string = environment.baseUrl + 'reservations/';

  constructor(private http: HttpClient) {}

  // GET ALL
  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // CREATE
  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.apiUrl, reservation).pipe(
      catchError(this.handleError)
    );
  }

  // UPDATE
  updateReservation(reserva_id: string, reservation: Reservation): Observable<Reservation> {
    const url = `${this.apiUrl}/${reserva_id}`;
    return this.http.put<Reservation>(url, reservation).pipe(
      catchError(this.handleError)
    );
  }

  // DELETE
  deleteReservation(reserva_id: string): Observable<void> {
    const url = `${this.apiUrl}${reserva_id}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error en ReservationsService:', error);
    return throwError(() => new Error('Ocurrió un error en la operación de películas.'));
  }
}