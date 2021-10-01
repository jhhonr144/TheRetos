import { TestBed } from '@angular/core/testing';

import { NewChallengsService } from './new-challengs.service';

describe('NewChallengsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewChallengsService = TestBed.get(NewChallengsService);
    expect(service).toBeTruthy();
  });
});
