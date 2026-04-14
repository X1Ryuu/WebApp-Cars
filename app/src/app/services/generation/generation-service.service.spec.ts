import { TestBed } from '@angular/core/testing';

import { GenerationService } from './generation-service.service';

describe('GenerationServiceService', () => {
  let service: GenerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
