import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialCharacteristicsComponent } from './material-characteristics.component';

describe('MaterialCharacteristicsComponent', () => {
  let component: MaterialCharacteristicsComponent;
  let fixture: ComponentFixture<MaterialCharacteristicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialCharacteristicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialCharacteristicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
