import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-btns',
  standalone: true,
  imports: [MenuModule, ToastModule],
  templateUrl: './btns.component.html',
  styleUrl: './btns.component.css',
  providers: [MessageService]
})

export class BtnsComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
      this.items = [
          {
              label: 'Menu',
              items: [
                  {
                      label: 'Pedir carona',
                      icon: 'pi pi-thumbs-up',
                      command: () => {
                          this.swapScreen("Solicitação de carona");
                      },
                      routerLink: 'pedir'
                  },
                  {
                      label: 'Oferecer carona',
                      icon: 'pi pi-car',
                      command: () => {
                          this.swapScreen("Oferecimento de carona");
                      },
                      routerLink: 'oferecer'
                  },
                  {
                      label: 'Historico',
                      icon: 'pi pi-clipboard',
                      command: () => {
                          this.swapScreen("Histórico");
                      },
                      routerLink: 'historico'
                  },
                  {
                      label: 'Chat',
                      icon: 'pi pi-comments',
                      command: () => {
                          this.swapScreen("Chat");
                      },
                      routerLink: 'chat'
                  },
                  {
                      label: 'Doacao',
                      icon: 'pi pi-money-bill',
                      command: () => {
                          this.swapScreen("Doação");
                      },
                      routerLink: 'doacao'
                  },
                  {
                      label: 'Mapa',
                      icon: 'pi pi-map',
                      command: () => {
                          this.swapScreen("Mapa");
                      },
                      routerLink: 'mapa'
                  }
              ]
          },
          {
              label: 'Outros',
              items: [
                  {
                      label: 'Configurações',
                      icon: 'pi pi-cog',
                      command: () => {
                        this.swapScreen("Configurações");
                      },
                      routerLink: 'configuracoes'
                  },
                  {
                      label: 'Suporte',
                      icon: 'pi pi-question-circle',
                      command: () => {
                        this.swapScreen("Suporte");
                      },
                      routerLink: 'suporte'
                  }
              ]
          }
      ];
  }

  update() {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
  }

  delete() {
      this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
  }

  swapScreen( pagina:string ) {
    this.messageService.add({ severity: 'success', summary: 'Seção trocada', detail: 'Troca de tela para ' + pagina + ' bem sucedida!' });
  }
}
