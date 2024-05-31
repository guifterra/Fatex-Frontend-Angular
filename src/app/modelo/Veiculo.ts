import { Marca } from "./Marca";
import { Modelo } from "./Modelo";

export class Veiculo {
  veiId: number = 0;
  veiPlaca: string = '';
  veiMaxPassageiros: number = 0;
  veiCor: string = '';
  modelo: Modelo = new Modelo();
  marca: Marca = new Marca();
}
