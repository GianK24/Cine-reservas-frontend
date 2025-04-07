import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { MovieFormComponent } from './components/movies-form/movies-form.component'
import { MoviesRoutingModule } from './movies-routing.module';

@NgModule({
  declarations: [MoviesListComponent, MovieFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule,MoviesRoutingModule],
  exports: [MoviesListComponent, MovieFormComponent]
})
export class MoviesModule {}
