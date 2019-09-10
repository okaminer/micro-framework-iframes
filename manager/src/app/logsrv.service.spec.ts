import { TestBed } from '@angular/core/testing';

import { LogsrvService } from './logsrv.service';

describe('LogsrvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogsrvService = TestBed.get(LogsrvService);
    expect(service).toBeTruthy();
  });
});
