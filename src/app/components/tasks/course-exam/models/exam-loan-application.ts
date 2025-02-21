export class ExamLoanApplication {

  loanAmount: number;
  loanDuration: number;
  estimatedMonthlyCost: number;
  totalCost: number;
  sosSecNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;

  constructor() {
    this.loanAmount = 500;
    this.loanDuration = 1;
    this.estimatedMonthlyCost = 0;
    this.totalCost = 0;
    this.sosSecNumber = "";
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.phoneNumber = "";
  }

  // laskee kuukausittaisen kustannuksen lainalle annetulla korkoprosentilla
  // ja asettaa sen estimatedMonthlyCost -muuttujaan.
  // hieman muunneltuna tehtävänannosta.
  calculateMonthlyCost(intrestRate: number) {
    this.estimatedMonthlyCost = ((Math.pow((1 + intrestRate / 1200), 12 * this.loanDuration) * intrestRate / 1200) /
      ((Math.pow((1 + intrestRate / 1200), 12 * this.loanDuration)) - 1) * this.loanAmount);
    return this.estimatedMonthlyCost;
  }

  // laskee lainan kokonaiskustannuksen

  calculateTotalCost() {
    this.totalCost = this.estimatedMonthlyCost * 12 * this.loanDuration;
    return this.totalCost;
  }

}
