import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OferecerCaronaComponent } from './oferecer-carona.component';

describe('OferecerCaronaComponent', () => {
  let component: OferecerCaronaComponent;
  let fixture: ComponentFixture<OferecerCaronaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OferecerCaronaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OferecerCaronaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
