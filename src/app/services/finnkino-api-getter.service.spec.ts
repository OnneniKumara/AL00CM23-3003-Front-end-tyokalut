import {TestBed} from '@angular/core/testing';

import {FinnkinoApiGetterService} from './finnkino-api-getter.service';

describe('FinnkinoApiGetterService', () => {
  let service: FinnkinoApiGetterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinnkinoApiGetterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
