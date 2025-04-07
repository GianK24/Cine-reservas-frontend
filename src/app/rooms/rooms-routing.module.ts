import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomsListComponent } from './components/rooms-list/rooms-list.component';
import { RoomFormComponent } from './components/rooms-form/rooms-form.component';

const routes: Routes = [
    {
     path: 'list',
     component: RoomsListComponent
   },
   {
    path: 'form',
    component: RoomFormComponent
  }
];


@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class RoomsRoutingModule { }