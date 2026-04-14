import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandEditionComponent } from './brand-edition.component';

describe('BrandEditionComponent', () => {
  let component: BrandEditionComponent;
  let fixture: ComponentFixture<BrandEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandEditionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
