import { Endereco } from "./Endereco";
import { MotoristaVeiculo } from "./MotoristaVeiculo";

export class Carona {
  carId: number = 0;
  carData: Date | null = null;
  carHora: string = '';
  carPartida: Endereco = new Endereco();
  carChegada: Endereco = new Endereco();
  carValorDoacao: number = 0;
  carStatus: 'Agendada' | 'Em_andamento' | 'Cancelada' | 'Concluida' | null = null;
  motoristaVeiculo: MotoristaVeiculo = new MotoristaVeiculo();
  carVagas: number = 0;
  carValorMinimo: number = 0;
}
