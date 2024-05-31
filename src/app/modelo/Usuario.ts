export class Usuario{

  usuId: number = 0;
  usuEmail: string = '';
  usuSenha: string = '';
  usuNome: string = '';
  usuDtNascimento: Date | null = null;
  usuGenero: 'M' | 'F' | 'O' | null = null;
  usuCpf: string = '';
  usuTipo: 'PASSAGEIRO' | 'MOTORISTA' | null = null;

}
