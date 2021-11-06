import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingOrderComponent } from './existing-order.component';

describe('ExistingOrderComponent', () => {
  let component: ExistingOrderComponent;
  let fixture: ComponentFixture<ExistingOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
