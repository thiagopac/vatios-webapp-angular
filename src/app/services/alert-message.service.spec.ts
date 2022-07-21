import { TestBed } from '@angular/core/testing';

import { AlertMessageService } from './alert-message.service';

describe('AlertMessageService', () => {
  let service: AlertMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
