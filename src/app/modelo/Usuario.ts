export class Usuario{

  usu_id: number = 0;
  usu_email: string = '';
  usu_senha: string = '';
  usu_nome: string = '';
  usu_dt_nascimento: Date | null = null;
  usu_genero: 'M' | 'F' | 'O' | null = null;
  usu_cpf: string = '';

}
