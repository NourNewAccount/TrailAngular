import { TestBed } from '@angular/core/testing';

import { MaterialModalService } from './material-modal.service';

describe('MaterialModalService', () => {
  let service: MaterialModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
