import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportExtraComponent } from './transport-extra.component';

describe('TransportExtraComponent', () => {
  let component: TransportExtraComponent;
  let fixture: ComponentFixture<TransportExtraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportExtraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
