import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelEditionComponent } from './model-edition.component';

describe('ModelEditionComponent', () => {
  let component: ModelEditionComponent;
  let fixture: ComponentFixture<ModelEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelEditionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
