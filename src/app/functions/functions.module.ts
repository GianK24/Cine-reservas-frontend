import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FunctionsListComponent } from './components/functions-list/functions-list.component';
import { FunctionsFormComponent } from './components/functions-form/functions-form.component'
import { FunctionsRoutingModule } from './functions-routing.module';

@NgModule({
  declarations: [FunctionsListComponent, FunctionsFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule,FunctionsRoutingModule],
  exports: [FunctionsListComponent, FunctionsFormComponent]
})
export class FunctionsModule {}
