import { TestBed } from '@angular/core/testing';

import { LiveService } from './live.service';

describe('UiService', () => {
  let service: LiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
