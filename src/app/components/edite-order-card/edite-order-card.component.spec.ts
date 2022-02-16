import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditeOrderCardComponent } from './edite-order-card.component';

describe('EditeOrderCardComponent', () => {
  let component: EditeOrderCardComponent;
  let fixture: ComponentFixture<EditeOrderCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditeOrderCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditeOrderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
