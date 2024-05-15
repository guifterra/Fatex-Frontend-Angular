export interface HistoricoItems {
  id: number;
  data: string;
  hora: string;
  pontoPartida: string;
  pontoChegada: string;
  valorDoado: number;
  motoristaEnvolvido: string,
  placaDoVeiculoUsado: string,
  passageirosEnvolvidos: string[],
  telefoneMotorista: string,
  telefonePassageiros: string[]
}
