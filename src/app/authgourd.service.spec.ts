import { TestBed } from '@angular/core/testing';

import { AuthgourdService } from './authgourd.service';

describe('AuthgourdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthgourdService = TestBed.get(AuthgourdService);
    expect(service).toBeTruthy();
  });
});
