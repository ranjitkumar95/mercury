import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingOfferComponent } from './existing-offer.component';

describe('ExistingOfferComponent', () => {
  let component: ExistingOfferComponent;
  let fixture: ComponentFixture<ExistingOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
