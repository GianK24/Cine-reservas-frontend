import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeModule } from './home/home.module';
import { NavbarComponent } from './navbar/navbar.component';
import { MoviesModule } from './movies/movies.module';
import { RoomsModule } from './rooms/rooms.module'
import { FunctionsModule } from './functions/functions.module'
import { ReservationsModule } from './reservations/reservations.module'

import { HomeRoutingModule } from './home/home-routing.module';
import { MoviesRoutingModule } from './movies/movies-routing.module';
import { RoomsRoutingModule } from './rooms/rooms-routing.module';
import { FunctionsRoutingModule } from './functions/functions-routing.module';
import { ReservationsRoutingModule } from './reservations/reservations-routing.module';



@NgModule({
  declarations: [	
    AppComponent, NavbarComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HomeModule,
    HomeRoutingModule,
    MoviesModule,
    MoviesRoutingModule,
    RoomsModule,
    RoomsRoutingModule,
    FunctionsModule,
    FunctionsRoutingModule,
    ReservationsModule,
    ReservationsRoutingModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
