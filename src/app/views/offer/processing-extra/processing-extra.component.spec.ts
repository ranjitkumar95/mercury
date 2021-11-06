import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingExtraComponent } from './processing-extra.component';

describe('ProcessingExtraComponent', () => {
  let component: ProcessingExtraComponent;
  let fixture: ComponentFixture<ProcessingExtraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessingExtraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessingExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
