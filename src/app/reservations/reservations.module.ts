import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReservationsListComponent } from './components/reservations-list/reservations-list.component';
import { ReservationFormComponent } from './components/reservations-form/reservations-form.component'
import { ReservationsRoutingModule } from './reservations-routing.module';

@NgModule({
  declarations: [ReservationsListComponent, ReservationFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule,ReservationsRoutingModule],
  exports: [ReservationsListComponent, ReservationFormComponent]
})
export class ReservationsModule {}
