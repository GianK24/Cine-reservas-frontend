import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationsListComponent } from './components/reservations-list/reservations-list.component';
import { ReservationFormComponent } from './components/reservations-form/reservations-form.component';

const routes: Routes = [
    {
     path: 'list',
     component: ReservationsListComponent
   },
   {
    path: 'form',
    component: ReservationFormComponent
  }
];


@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class ReservationsRoutingModule { }