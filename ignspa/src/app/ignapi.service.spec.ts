import { TestBed } from '@angular/core/testing';

import { IGNapiService } from './ignapi.service';

describe('IGNapiService', () => {
  let service: IGNapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IGNapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
