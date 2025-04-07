import { environment } from '../../../environments/environment.development';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { FunctionModel } from '../models/functions.model';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService  {

  public apiUrl: string = environment.baseUrl + 'functions/';

  constructor(private http: HttpClient) {}

  // GET ALL
  getFunctions(): Observable<FunctionModel[]> {
    return this.http.get<FunctionModel[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

   // CREATE
   createFunction(func: FunctionModel): Observable<FunctionModel> {
    return this.http.post<FunctionModel>(this.apiUrl, func).pipe(
      catchError(this.handleError)
    );
  }

  // UPDATE
  updateFunction(funcion_id: string, func: FunctionModel): Observable<FunctionModel> {
    const url = `${this.apiUrl}/${funcion_id}`;
    return this.http.put<FunctionModel>(url, func).pipe(
      catchError(this.handleError)
    );
  }

  // DELETE
  deleteFunction(funcion_id: string): Observable<void> {
    const url = `${this.apiUrl}/${funcion_id}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) {
    console.error('Error en FunctionsService:', error);
    return throwError(() => new Error('Ocurrió un error en la operación de películas.'));
  }
}