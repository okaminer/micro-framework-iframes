import { TestBed } from '@angular/core/testing';

import { InternalServerBusService } from './internal-server-bus.service';

describe('InternalServerBusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InternalServerBusService = TestBed.get(InternalServerBusService);
    expect(service).toBeTruthy();
  });
});
