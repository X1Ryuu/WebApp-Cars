import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadEngineComponent } from './bread-engine.component';

describe('BreadEngineComponent', () => {
  let component: BreadEngineComponent;
  let fixture: ComponentFixture<BreadEngineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadEngineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreadEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
