import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferSummeryComponent } from './offer-summery.component';

describe('OfferSummeryComponent', () => {
  let component: OfferSummeryComponent;
  let fixture: ComponentFixture<OfferSummeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferSummeryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
