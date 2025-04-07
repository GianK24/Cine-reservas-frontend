import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FunctionsService } from '../../../functions/services/functions.service';
import { ReservationsService } from '../../services/reservations.service';
import { FunctionModel } from '../../../functions/models/functions.model';
import { Seat } from '../../../seats/models/seats.model';
import { MoviesService } from '../../../movies/services/movies.service';
import { RoomsService } from '../../../rooms/services/rooms.service';
import { Movie } from '../../../movies/models/movies.model';
import { Room } from '../../../rooms/models/rooms.model';

declare const Swal: any;

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservations-form.component.html',
  styleUrls: ['./reservations-form.component.css']
})

export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup;
  functions: FunctionModel[] = [];
  movies: Movie[] = [];
  rooms: Room[] = [];
  seats: Seat[] = [];
  seatRows: Seat[][] = [];
  selectedSeatIds: string[] = [];

  constructor(
    private fb: FormBuilder,
    private functionsService: FunctionsService,
    private reservationsService: ReservationsService,
    private moviesService: MoviesService,
    private roomsService: RoomsService,
  ) {
    this.reservationForm = this.fb.group({
      function_id: ['', Validators.required],
      seats_selected: ['', Validators.required],
      numeber_seats_selected: [0, Validators.required],
      user_email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.loadFunctions();
  }

  /** Cargar funciones con info de película y sala */
  loadFunctions(): void {
    this.functionsService.getFunctions().subscribe(funcs => {
      this.functions = funcs;
  
      this.moviesService.getMovies().subscribe(movies => {
        this.movies = movies;
  
        this.roomsService.getRooms().subscribe(rooms => {
          this.rooms = rooms;
  
          // Vincular objetos de movie y room a cada función
          this.functions.forEach(fn => {
            fn.movie = this.movies.find(m => m.pelicula_id === fn.movie_id);
            fn.room = this.rooms.find(r => r.sala_id === fn.room_id);
            // Agregar displayText concatenado (puedes formatear el horario según necesites)
            const formattedSchedule = new Date(fn.schedule).toLocaleString();
            fn.displayText = `${fn.movie?.title || 'Desconocido'}, ${fn.room?.name || 'Desconocido'}, ${formattedSchedule}`;
          });
        });
      });
    });
  }



  // Cuando cambia la función seleccionada, cargar su mapa de asientos
  onFunctionChange(functionId: string): void {
    if (!functionId) {
      this.seats = [];
      this.seatRows = [];
      return;
    }
    this.functionsService.getSeatsByFunction(functionId).subscribe(data => {
      this.seats = data;
      this.groupSeatsIntoRows();
      // Reiniciar selección
      this.selectedSeatIds = [];
      this.updateSeatSelectionFields();
    });
  }

  // Agrupar los asientos por fila para mostrarlos en el mapa
  groupSeatsIntoRows(): void {
    const rowsMap: { [key: string]: Seat[] } = {};
    this.seats.forEach(seat => {
      if (!rowsMap[seat.row]) {
        rowsMap[seat.row] = [];
      }
      rowsMap[seat.row].push(seat);
    });
    // Ordenar las filas alfabéticamente y los asientos numéricamente
    this.seatRows = Object.keys(rowsMap)
      .sort()
      .map(row => rowsMap[row].sort((a, b) => a.number - b.number));
  }

  // Verifica si un asiento está seleccionado
  isSeatSelected(seat: Seat): boolean {
    return this.selectedSeatIds.includes(`${seat.row}${seat.number}`);
  }

  // Alterna la selección de un asiento (si está disponible)
  toggleSeat(seat: Seat): void {
    // Solo permitir si no está ocupado
    if (seat.is_taken) return;
    const seatIdentifier = `${seat.row}${seat.number}`;
    const index = this.selectedSeatIds.indexOf(seatIdentifier);
    if (index > -1) {
      // Si ya estaba seleccionado, deseleccionarlo
      this.selectedSeatIds.splice(index, 1);
    } else {
      // Seleccionarlo
      this.selectedSeatIds.push(seatIdentifier);
    }
    this.updateSeatSelectionFields();
  }

  // Actualiza los campos del formulario en base a la selección de asientos
  updateSeatSelectionFields(): void {
    const seatsSelectedStr = this.selectedSeatIds.join(',');
    this.reservationForm.patchValue({
      seats_selected: seatsSelectedStr,
      numeber_seats_selected: this.selectedSeatIds.length
    });
  }

  onSubmit(): void {
    if (this.reservationForm.invalid) {
      Swal.fire('Formulario incompleto', 'Por favor completa todos los campos correctamente', 'warning');
      return;
    }

    this.reservationsService.createReservation(this.reservationForm.value).subscribe({
      next: () => {
        Swal.fire('Reserva registrada', 'La reserva fue guardada exitosamente', 'success');
        this.reservationForm.reset();
        this.selectedSeatIds = [];
        this.seats = [];
        this.seatRows = [];
      },
      error: err => {
        Swal.fire('Error', 'No se pudo registrar la reserva: ' + err.message, 'error');
      }
    });
  }
}