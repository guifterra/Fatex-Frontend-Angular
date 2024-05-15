import { Component, ViewChild } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { Sidebar } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { BtnsComponent } from './btns/btns.component';
import { AvatarModule } from 'primeng/avatar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarModule, ButtonModule, BtnsComponent, AvatarModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
// export class SidebarComponent {
//   sidebarVisible: boolean = true;
//   userName: string = 'Username';
// }

export class SidebarComponent {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  itensMenu: any = [
    { title: "MENU", btnValues: [
                                  { icone: "pi-flag-fill" , texto: "Pedir Carona", rl: "pedir" },
                                  { icone: "pi-car" , texto: "Fornecer Carona", rl: "oferecer" },
                                  { icone: "pi-comments" , texto: "Chat", rl: "chat" },
                                  { icone: "pi-history" , texto: "Histórico", rl: "historico" },
                                  { icone: "pi-map" , texto: "Mapa", rl: "mapa" }
                                ]
    },
    { title: "CONFIGURAÇÕES ADICIONAIS", btnValues: [
                                                      { icone: "pi-credit-card" , texto: "Pagamento", rl: "doacao" },
                                                      { icone: "pi-question-circle" , texto: "Suporte", rl: "suporte" },
                                                      { icone: "pi-cog" , texto: "Configurações", rl: "configuracoes" }
                                                    ]
    }
  ];

  closeCallback(e: Event): void {
      this.sidebarRef.close(e);
  }

  sidebarVisible: boolean = false;
}
