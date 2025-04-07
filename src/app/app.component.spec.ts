import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { DocumentoListComponent } from './documento/documento-list/documento-list.component';
import { PacienteListComponent } from './paciente/paciente-list/paciente-list.component';
import { IngresoListComponent } from './ingreso/ingreso-list/ingreso-list.component';  // Importa IngresoListComponent
import { SalaOperacionesListComponent } from './sala-operaciones/components/sala-operaciones-list/sala-operaciones-list.component';
import  { NavbarComponent } from './navbar/navbar.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent, 
        DocumentoListComponent, 
        PacienteListComponent, 
        IngresoListComponent,  // Agrega IngresoListComponent aquí
        SalaOperacionesListComponent,
        NavbarComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Movie Reservation'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Movie Reservation');
  });
});
/* Archivo src/app/app.component.spec.ts */
