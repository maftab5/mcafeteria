import { TestBed } from '@angular/core/testing';

import { SiteuserServiceService } from './siteuser-service.service';

describe('SiteuserServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SiteuserServiceService = TestBed.get(SiteuserServiceService);
    expect(service).toBeTruthy();
  });
});
