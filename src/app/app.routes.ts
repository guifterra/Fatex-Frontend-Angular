import { Routes } from '@angular/router';
import { MapaComponent } from './components/mapa/mapa.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { ChatComponent } from './components/chat/chat.component';
import { ConfiguracoesComponent } from './components/configuracoes/configuracoes.component';
import { DoacaoComponent } from './components/doacao/doacao.component';
import { HistoricoComponent } from './components/historico/historico.component';
import { LoginComponent } from './components/login/login.component';
import { OferecerCaronaComponent } from './components/oferecer-carona/oferecer-carona.component';
import { PedirCaronaComponent } from './components/pedir-carona/pedir-carona.component';
import { SuporteComponent } from './components/suporte/suporte.component';
import { SistemaComponent } from './components/sistema/sistema.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  {
    path: 'sistema',
    component: SistemaComponent,
    children: [
      { path: 'historico', component: HistoricoComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'configuracoes', component: ConfiguracoesComponent },
      { path: 'doacao', component: DoacaoComponent },
      { path: 'mapa', component: MapaComponent },
      { path: 'oferecer', component: OferecerCaronaComponent },
      { path: 'pedir', component: PedirCaronaComponent },
      { path: 'suporte', component: SuporteComponent },
    ],
  },
];
