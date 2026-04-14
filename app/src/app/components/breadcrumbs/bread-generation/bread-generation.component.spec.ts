import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadGenerationComponent } from './bread-generation.component';

describe('BreadGenerationComponent', () => {
  let component: BreadGenerationComponent;
  let fixture: ComponentFixture<BreadGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadGenerationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreadGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
