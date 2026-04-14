import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadBrandComponent } from './bread-brand.component';

describe('BreadBrandComponent', () => {
  let component: BreadBrandComponent;
  let fixture: ComponentFixture<BreadBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadBrandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreadBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
