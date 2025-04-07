import { Movie } from '../../movies/models/movies.model';
import { Room } from '../../rooms/models/rooms.model';

export class FunctionModel {
  funcion_id: string;
  room_id: string;
  movie_id: string;
  movie?: Movie;
  room?: Room;
  available_seats: number;
  schedule: string;

  constructor(
    funcion_id: string,
    room_id: string,
    movie_id: string,
    available_seats: number,
    schedule: string
  ) {
    this.funcion_id = funcion_id;
    this.room_id = room_id;
    this.movie_id = movie_id;
    this.available_seats = available_seats;
    this.schedule = schedule;
  }
}

