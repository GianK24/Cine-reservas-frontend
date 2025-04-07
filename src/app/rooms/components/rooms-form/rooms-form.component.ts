import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomsService } from '../../services/rooms.service';
declare const Swal: any;

@Component({
  selector: 'app-room-form',
  templateUrl: './rooms-form.component.html',
  styleUrls: ['./rooms-form.component.css'],
})
export class RoomFormComponent {
  roomForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private roomsService: RoomsService
  ) {
    this.roomForm = this.fb.group({
      name: ['', Validators.required],
      capacity: [null, [Validators.required, Validators.min(1)]]
    });
  }

  get name() {
    return this.roomForm.get('name');
  }
  get capacity() {
    return this.roomForm.get('capacity');
  }

  onSubmit(): void {
    if (this.roomForm.valid) {
      const newRoom = this.roomForm.value;
      this.roomsService.createRoom(newRoom).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Sala registrada correctamente.',
            confirmButtonText: 'Aceptar'
          });
          this.roomForm.reset();
        },
        error: err => {
          Swal.fire({
            icon: 'error',
            title: 'Error al registrar',
            text: err.message,
            confirmButtonText: 'Aceptar'
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario inválido',
        text: 'Por favor corrige los errores antes de enviar.',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}