import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Kitchen2Component } from './kitchen2.component';

describe('Kitchen2Component', () => {
  let component: Kitchen2Component;
  let fixture: ComponentFixture<Kitchen2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Kitchen2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Kitchen2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
