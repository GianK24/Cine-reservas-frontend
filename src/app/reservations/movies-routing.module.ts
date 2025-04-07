import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { MovieFormComponent } from './components/movies-form/movies-form.component';

const routes: Routes = [
    {
     path: 'list',
     component: MoviesListComponent
   },
   {
    path: 'form',
    component: MovieFormComponent
  }
];


@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class MoviesRoutingModule { }