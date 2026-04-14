import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarAddPillsComponent } from './car-add-pills.component';

describe('CarAddPillsComponent', () => {
  let component: CarAddPillsComponent;
  let fixture: ComponentFixture<CarAddPillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarAddPillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarAddPillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
