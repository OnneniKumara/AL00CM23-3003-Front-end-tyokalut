export class ExamLoanApplication {

  loanAmount: number;
  loanDuration: number;
  estimatedMonthlyCost: number;
  sosSecNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;

  constructor() {
    this.loanAmount = 0;
    this.loanDuration = 0;
    this.estimatedMonthlyCost = 0;
    this.sosSecNumber = "";
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.phoneNumber = "";
  }

}
