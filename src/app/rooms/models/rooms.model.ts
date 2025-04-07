export class Room {
  sala_id: string;
  name: string;
  capacity: number;

  constructor(sala_id: string, name: string, capacity: number) {
    this.sala_id = sala_id;
    this.name = name;
    this.capacity = capacity;
  }
}
