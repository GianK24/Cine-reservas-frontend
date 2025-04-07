import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationsService } from '../../services/reservations.service';
import { Reservation } from '../../models/reservations.model';

@Component({
  selector: 'app-reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrls: ['./reservations-list.component.css']
})

export class ReservationsListComponent implements OnInit {
  reservations: Reservation[] = [];
  filteredReservations: Reservation[] = [];
  filterText: string = '';

  constructor(
    private reservationService: ReservationsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  /** Carga todas las reservas desde el servicio */
  private loadReservations(): void {
    this.reservationService.getReservations().subscribe(data => {
      this.reservations = data;
      this.filteredReservations = data;
    });
  }

  /** Filtra por email */
  searchReservations(): void {
    const txt = this.filterText.trim().toLowerCase();
    this.filteredReservations = txt
      ? this.reservations.filter(r => r.user_email.toLowerCase().includes(txt))
      : this.reservations;
  }

  /** Elimina la reserva y recarga la lista */
  onDelete(reservation: Reservation): void {
    const ok = confirm(`¿Seguro que deseas eliminar la reserva de ${reservation.user_email}?`);
    if (!ok) return;

    this.reservationService.deleteReservation(reservation.reserva_id).subscribe({
      next: () => this.loadReservations(),
      error: err => alert('Error al eliminar: ' + err.message)
    });
  }
}