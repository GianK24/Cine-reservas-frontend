import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoomsListComponent } from './components/rooms-list/rooms-list.component';
import { RoomFormComponent } from './components/rooms-form/rooms-form.component'
import { RoomsRoutingModule } from './rooms-routing.module';

@NgModule({
  declarations: [RoomsListComponent, RoomFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule,RoomsRoutingModule],
  exports: [RoomsListComponent, RoomFormComponent]
})
export class RoomsModule {}
