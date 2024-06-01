import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusVeiculosComponent } from './meus-veiculos.component';

describe('MeusVeiculosComponent', () => {
  let component: MeusVeiculosComponent;
  let fixture: ComponentFixture<MeusVeiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeusVeiculosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeusVeiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
