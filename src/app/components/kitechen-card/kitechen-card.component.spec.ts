import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitechenCardComponent } from './kitechen-card.component';

describe('KitechenCardComponent', () => {
  let component: KitechenCardComponent;
  let fixture: ComponentFixture<KitechenCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KitechenCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KitechenCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
