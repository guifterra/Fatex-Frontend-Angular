// HistoricoService
import { Injectable } from '@angular/core';
import { HistoricoItems } from '../domain/itemDoHistorico';

@Injectable({
    providedIn: 'root'
})
export class HistoricoService {

    // Método para simular a obtenção de produtos
    getHistoricosMini(): Promise<HistoricoItems[]> {
        return new Promise((resolve) => {
            // Suponha que aqui você esteja fazendo uma requisição HTTP para obter os produtos
            // Por simplicidade, estamos apenas resolvendo com dados simulados
            const historicos: HistoricoItems[] = [
                { id: 1, data: "02-02-2024", hora: "12:30:05", pontoPartida: "Rua Adriel Lopes, 33 - Village Santana, Guaratinguetá - SP",
                  pontoChegada: "Av. Prof. Joao Rodrigues, 1501 - Jardim Esperança - Guaratinguetá SP",
                  valorDoado: 0.00, motoristaEnvolvido: "Guizao", placaDoVeiculoUsado: "PNF3126",
                  passageirosEnvolvidos: ["Brunao"], telefoneMotorista: "(12) 99123-4567",
                  telefonePassageiros: [ "(12) 99123-4568" ]
                },
                { id: 2, data: "13-04-2024", hora: "22:34:27", pontoPartida: "Rua Adriel Lopes, 33 - Village Santana, Guaratinguetá - SP",
                  pontoChegada: "Av. Prof. Joao Rodrigues, 1501 - Jardim Esperança - Guaratinguetá SP",
                  valorDoado: 5.00, motoristaEnvolvido: "Cristovão", placaDoVeiculoUsado: "GAP8472",
                  passageirosEnvolvidos: ["Dionísio","Claudemir"], telefoneMotorista: "(12) 99123-4567",
                  telefonePassageiros: [ "(12) 99123-4568" ]
                },
                { id: 3, data: "29-05-2024", hora: "13:55:58", pontoPartida: "Av. Prof. Joao Rodrigues, 1501 - Jardim Esperança - Guaratinguetá SP",
                  pontoChegada: "Rua Adriel Lopes, 33 - Village Santana, Guaratinguetá - SP",
                  valorDoado: 0.00, motoristaEnvolvido: "Claudemir", placaDoVeiculoUsado: "PNF3126",
                  passageirosEnvolvidos: ["Pedro"], telefoneMotorista: "(12) 99123-4567",
                  telefonePassageiros: [ "(12) 99123-4568" ]
                },
                { id: 4, data: "02-02-2024", hora: "12:30:05", pontoPartida: "Rua Adriel Lopes, 33 - Village Santana, Guaratinguetá - SP",
                  pontoChegada: "Av. Prof. Joao Rodrigues, 1501 - Jardim Esperança - Guaratinguetá SP",
                  valorDoado: 0.00, motoristaEnvolvido: "Guizao", placaDoVeiculoUsado: "PNF3126",
                  passageirosEnvolvidos: ["Brunao"], telefoneMotorista: "(12) 99123-4567",
                  telefonePassageiros: [ "(12) 99123-4568" ]
                },
                { id: 5, data: "13-04-2024", hora: "22:34:27", pontoPartida: "Rua Adriel Lopes, 33 - Village Santana, Guaratinguetá - SP",
                  pontoChegada: "Av. Prof. Joao Rodrigues, 1501 - Jardim Esperança - Guaratinguetá SP",
                  valorDoado: 5.00, motoristaEnvolvido: "Cristovão", placaDoVeiculoUsado: "GAP8472",
                  passageirosEnvolvidos: ["Dionísio","Claudemir"], telefoneMotorista: "(12) 99123-4567",
                  telefonePassageiros: [ "(12) 99123-4568" ]
                },
                { id: 6, data: "29-05-2024", hora: "13:55:58", pontoPartida: "Av. Prof. Joao Rodrigues, 1501 - Jardim Esperança - Guaratinguetá SP",
                  pontoChegada: "Rua Adriel Lopes, 33 - Village Santana, Guaratinguetá - SP",
                  valorDoado: 0.00, motoristaEnvolvido: "Claudemir", placaDoVeiculoUsado: "PNF3126",
                  passageirosEnvolvidos: ["Pedro"], telefoneMotorista: "(12) 99123-4567",
                  telefonePassageiros: [ "(12) 99123-4568" ]
                },
                // Adicione mais produtos conforme necessário
            ];
            resolve(historicos);
        });
    }
}
