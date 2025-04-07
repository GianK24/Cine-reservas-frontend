import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FunctionsListComponent } from './components/functions-list/functions-list.component';
import { FunctionsFormComponent } from './components/functions-form/functions-form.component';

const routes: Routes = [
    {
     path: 'list',
     component: FunctionsListComponent
   },
   {
    path: 'form',
    component: FunctionsFormComponent
  }
];


@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class FunctionsRoutingModule { }