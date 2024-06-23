import { Usuario } from "./Usuario";

export class Motorista {
  motId: number = 0;
  motNota: number = 0;
  motQtAvaliacoes: number = 0;
  motCnh: string = '';
  usuario: Usuario = new Usuario();
}
