import {TestBed} from '@angular/core/testing';

import {ExamLoanApplicationService} from './exam-loan-application.service';

describe('ExamLoanApplicationService', () => {
  let service: ExamLoanApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamLoanApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
