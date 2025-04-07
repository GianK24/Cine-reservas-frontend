export class Reservation {
  reserva_id: string;
  function_id: string;
  seats_selected: string;
  numeber_seats_selected: number;
  user_email: string;

  constructor(
    reserva_id: string,
    function_id: string,
    seats_selected: string,
    numeber_seats_selected: number,
    user_email: string
  ) {
    this.reserva_id = reserva_id;
    this.function_id = function_id;
    this.seats_selected = seats_selected;
    this.numeber_seats_selected = numeber_seats_selected
    this.user_email = user_email;
  }
}

