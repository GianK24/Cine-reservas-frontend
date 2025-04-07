export class Movie {
  pelicula_id: string;
  title: string;
  genre: string;
  duration: number;
  rating: string;

  constructor(id: string, title: string, genre: string, duration: number, rating: string) {
    this.pelicula_id = id;
    this.title = title;
    this.genre = genre;
    this.duration = duration;
    this.rating = rating;
  }
}
