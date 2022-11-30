import { TestBed } from '@angular/core/testing';

import { HealthSafetyManagerService } from './health-safety-manager.service';

describe('HealthSafetyManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HealthSafetyManagerService = TestBed.get(HealthSafetyManagerService);
    expect(service).toBeTruthy();
  });
});
