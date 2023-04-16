export interface Equipos {
  nombre: string;
  estadio: string;
  sitioWeb: string;
  nacionalidad: string;
  fundacion: Date;
  entrenador: string;
  capacidad: number;
  valor: number;
  id?: number;
}

export interface User {
  username: string;
  password: string
}

export interface DialogData {
  text: string;
}
