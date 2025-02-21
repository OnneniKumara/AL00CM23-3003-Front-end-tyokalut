export class Question {
  questionText: string;
  answer: string;
  value: number;
  disabled = false;
  max = 4;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;


  constructor(questionText: string) {
    this.questionText = questionText;
    this.value = 0;
    this.answer = this.setFeedback(this.value);
  }

  setFeedback(value: number): string {
    console.log('kävi täällä' + value)
    // vaihdettu if ketju string arrayksi
    const answerArray: Array<string> = [
      "Ei Vielä Arvosteltu",
      "Huonosti",
      "Keskinkertaisesti",
      "Hyvin",
      "Erinomaisesti"
    ]
    return answerArray[value]
  }
}
