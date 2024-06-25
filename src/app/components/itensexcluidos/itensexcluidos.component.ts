import { Component } from '@angular/core';
import { TabelaComponent } from './tabela/tabela.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-itensexcluidos',
  standalone: true,
  imports: [TabelaComponent, ToastModule, ButtonModule, InputTextModule, DialogModule, CommonModule, TooltipModule, FormsModule, DropdownModule, InputMaskModule],
  templateUrl: './itensexcluidos.component.html',
  styleUrl: './itensexcluidos.component.css',
  providers: [MessageService],
})
export class ItensexcluidosComponent {

}
