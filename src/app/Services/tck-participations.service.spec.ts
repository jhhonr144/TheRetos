import { TestBed } from '@angular/core/testing';

import { TckParticipationsService } from './tck-participations.service';

describe('TckParticipationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TckParticipationsService = TestBed.get(TckParticipationsService);
    expect(service).toBeTruthy();
  });
});
