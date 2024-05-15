import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedirCaronaComponent } from './pedir-carona.component';

describe('PedirCaronaComponent', () => {
  let component: PedirCaronaComponent;
  let fixture: ComponentFixture<PedirCaronaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedirCaronaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PedirCaronaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
