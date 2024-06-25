import { Component, OnInit } from '@angular/core';
import { Endereco } from '../../../modelo/Endereco';
import { EnderecoService } from '../../../services/END_ENDERECOS/endereco.service';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RippleModule } from 'primeng/ripple';
import { Usuario } from '../../../modelo/Usuario';
import { UsuarioService } from '../../../services/USU_USUARIO/usuario.service';

@Component({
  selector: 'app-tabela-2',
  standalone: true,
  imports: [TableModule, SidebarModule, ButtonModule, ToastModule, ConfirmDialogModule, RippleModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit {

  enderecos: Endereco[] = [];
  SelectedEnderecos: Endereco[] = [];
  usuario: Usuario | undefined | null;

  constructor(private enderecoService: EnderecoService, private usuarioService: UsuarioService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

  ngOnInit() {
    this.carregarEnderecos();
    this.carregarUsuario();
  }

  carregarEnderecos(){
    this.enderecoService.getEnderecosDoUsuario().subscribe((data: Endereco[]) => {
      console.log("teste: " + data[0]);
      this.enderecos = data;
    });
  }

  carregarUsuario(){
    if(!((this.usuarioService.getCurrentUser()) == null))
      this.usuario = this.usuarioService.getCurrentUser(); // Obter dados do usuário do Local Storage
    else
      this.usuario = new Usuario();
  }

  desabilitarEndereco(endereco: Endereco): void {
    this.confirmationService.confirm({
      message: 'Deseja desabilitar esse endereço?',
      header: 'Confirmar ação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const jsonUsuEnd = {
          endereco: endereco,
          usuario: this.usuario ? this.usuario : new Usuario() // Assuming you don't need to include motorista in this operation
        };

        this.enderecoService.alterarVisibilidadeDoMeuEndereco(jsonUsuEnd).subscribe(
          (response: any) => {
            console.log(`Endereco com id ${endereco.endId} desabilitado com sucesso`, response);
            this.enderecos = this.enderecos.filter(e => e.endId !== endereco.endId);
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Veículo desabilitado com sucesso', life: 3000 });
            this.carregarEnderecos();
          },
          (error: any) => {
            console.error(`Erro ao desabilitar veículo com ID ${endereco.endId}`, error);
            this.messageService.add({ severity: 'warn', summary: 'Erro', detail: 'Veículo desabilitado com sucesso', life: 3000 });
            this.carregarEnderecos();
          }
        );
      },
      reject: () => {
        // Optionally handle rejection or do nothing
      }
    });
  }
}
