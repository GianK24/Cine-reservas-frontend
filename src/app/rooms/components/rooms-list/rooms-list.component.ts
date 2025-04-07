import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomsService } from '../../services/rooms.service';
import { Room } from '../../models/rooms.model';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css']
})
export class RoomsListComponent implements OnInit {
  rooms: Room[] = [];
  filteredRooms: Room[] = [];
  filterText = '';

  constructor(
    private roomsService: RoomsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  /** Carga todas las salas desde el servicio */
  private loadRooms(): void {
    this.roomsService.getRooms().subscribe(data => {
      this.rooms = data;
      this.filteredRooms = data;
    });
  }

  /** Filtra por nombre de sala */
  searchRooms(): void {
    const txt = this.filterText.trim().toLowerCase();
    this.filteredRooms = txt
      ? this.rooms.filter(r => r.name.toLowerCase().includes(txt))
      : this.rooms;
  }

  /** Elimina la sala y recarga la lista */
  onDelete(room: Room): void {
    const ok = window.confirm(`¿Seguro que deseas eliminar la sala "${room.name}"?`);
    if (!ok) return;

    this.roomsService.deleteRoom(room.sala_id)
      .subscribe({
        next: () => this.loadRooms(),
        error: err => alert('Error al eliminar: ' + err.message)
      });
  }
}
