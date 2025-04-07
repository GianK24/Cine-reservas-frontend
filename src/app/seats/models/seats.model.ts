export interface Seat {
  seat_id: string;
  function_id: string;
  row: string;
  number: number;
  is_taken: boolean;
  // Agregamos un campo opcional para el manejo local de selección
  selected?: boolean;
}
