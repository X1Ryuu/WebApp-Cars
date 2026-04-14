import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadVersionComponent } from './bread-version.component';

describe('BreadVersionComponent', () => {
  let component: BreadVersionComponent;
  let fixture: ComponentFixture<BreadVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadVersionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreadVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
