import {Injectable} from '@angular/core';
import {ExamLoanApplication} from '../models/exam-loan-application';

@Injectable({
  providedIn: 'root'
})
export class ExamLoanApplicationService {

  // taulukko lainahakemuksista
  loanApplications: Array<ExamLoanApplication> = [];

  constructor() {
  }

  // tallentaa lainahakemuksen
  sendLoanApplication(loanApplication: ExamLoanApplication) {
    this.loanApplications.push(loanApplication)

    // konsoliin tulostus sisällöstä
    console.log(loanApplication)
  }
}
