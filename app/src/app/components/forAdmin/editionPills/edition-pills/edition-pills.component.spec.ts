import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionPillsComponent } from './edition-pills.component';

describe('EditionPillsComponent', () => {
  let component: EditionPillsComponent;
  let fixture: ComponentFixture<EditionPillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditionPillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditionPillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
