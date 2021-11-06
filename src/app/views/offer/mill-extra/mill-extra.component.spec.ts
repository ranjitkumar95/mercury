import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MillExtraComponent } from './mill-extra.component';

describe('MillExtraComponent', () => {
  let component: MillExtraComponent;
  let fixture: ComponentFixture<MillExtraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MillExtraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MillExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
