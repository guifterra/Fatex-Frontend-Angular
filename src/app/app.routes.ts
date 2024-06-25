import { Routes } from '@angular/router';
import { MapaComponent } from './components/mapa/mapa.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { ChatComponent } from './components/chat/chat.component';
import { ConfiguracoesComponent } from './components/configuracoes/configuracoes.component';
import { DoacaoComponent } from './components/doacao/doacao.component';
import { HistoricoComponent } from './components/historico/historico.component';
import { LoginComponent } from './components/login/login.component';
import { PedirCaronaComponent } from './components/pedir-carona/pedir-carona.component';
import { SuporteComponent } from './components/suporte/suporte.component';
import { SistemaComponent } from './components/sistema/sistema.component';
import { MeusVeiculosComponent } from './components/meus-veiculos/meus-veiculos.component';
import { MeusEnderecosComponent } from './components/meus-enderecos/meus-enderecos.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { VisualizarCaronasComponent } from './components/visualizar-caronas/visualizar-caronas.component';
import { ItensexcluidosComponent } from './components/itensexcluidos/itensexcluidos.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  {
    path: 'sistema',
    component: SistemaComponent,
    children: [
      { path: '', component: MapaComponent },
      { path: 'historico', component: HistoricoComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'configuracoes', component: ConfiguracoesComponent },
      { path: 'doacao', component: DoacaoComponent },
      { path: 'visualizar', component: VisualizarCaronasComponent },
      { path: 'suporte', component: SuporteComponent },
      { path: 'meusVeiculos', component: MeusVeiculosComponent },
      { path: 'meusEnderecos', component: MeusEnderecosComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'itensexcluidos', component: ItensexcluidosComponent }
    ],
  },
];
