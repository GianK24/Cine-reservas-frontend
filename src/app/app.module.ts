import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MoviesModule } from './movies/movies.module';
import { HomeModule } from './home/home.module';
import { NavbarComponent } from './navbar/navbar.component';

import { MoviesRoutingModule } from './movies/movies-routing.module';
import { HomeRoutingModule } from './home/home-routing.module';



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
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
