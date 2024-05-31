import { Endereco } from "./Endereco";
import { MotoristaVeiculo } from "./MotoristaVeiculo";


export class Carona {
  carId: number = 0;
  carData: Date | null = null;
  carHora: string = '';
  carPartida: Endereco = new Endereco();
  carChegada: Endereco = new Endereco();
  carValorDoacao: number = 0;
  carStatus: 'AGENDADA' | 'EM_ANDAMENTO' | 'CANCELADA' | 'CONCLUIDA' | null = null;
  motoristaVeiculo: MotoristaVeiculo = new MotoristaVeiculo();
}
