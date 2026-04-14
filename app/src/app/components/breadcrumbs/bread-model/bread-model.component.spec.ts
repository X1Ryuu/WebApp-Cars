import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadModelComponent } from './bread-model.component';

describe('BreadModelComponent', () => {
  let component: BreadModelComponent;
  let fixture: ComponentFixture<BreadModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreadModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
