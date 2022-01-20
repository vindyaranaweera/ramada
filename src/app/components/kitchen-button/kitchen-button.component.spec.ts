import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenButtonComponent } from './kitchen-button.component';

describe('KitchenButtonComponent', () => {
  let component: KitchenButtonComponent;
  let fixture: ComponentFixture<KitchenButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KitchenButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KitchenButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
