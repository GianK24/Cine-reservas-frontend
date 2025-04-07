import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FunctionsService } from '../../../functions/services/functions.service';
import { ReservationsService } from '../../services/reservations.service';
import { FunctionModel } from '../../../functions/models/functions.model';
declare const Swal: any;

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservations-form.component.html',
  styleUrls: ['./reservations-form.component.css']
})

export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup;
  functions: any[] = [];

  constructor(
    private fb: FormBuilder,
    private functionsService: FunctionsService,
    private reservationsService: ReservationsService
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
    // this.functionsService.getFunctionsWithDetails().subscribe(data => {
    //   this.functions = data;
    // });
  }

  /** Calcular número de asientos automáticamente */
  updateSeatCount(): void {
    const seats = this.reservationForm.value.seats_selected;
    const count = seats ? seats.split(',').filter((s: string) => s.trim() !== '').length : 0;
    this.reservationForm.patchValue({ numeber_seats_selected: count });
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
      },
      error: err => {
        Swal.fire('Error', 'No se pudo registrar la reserva: ' + err.message, 'error');
      }
    });
  }
}