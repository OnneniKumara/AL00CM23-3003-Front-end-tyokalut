export class Question {
  questionText: string;
  answer: string | undefined;
  value: number | undefined;
  disabled = false;
  max = 5;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;


  constructor(questionText: string) {
    this.questionText = questionText;
    this.answer = "";
    this.value = 0;
  }

  setFeedback(value: number) {
    if (value === 0 || value === undefined) {
      this.answer = "Ei vastattu.";
    } else if (value === 1) {
      this.answer = "Huono";
    } else if (value === 2) {
      this.answer = "Välttävä";
    } else if (value === 3) {
      this.answer = "Keskinkertainen";
    } else if (value === 4) {
      this.answer = "Hyvä";
    } else if (value === 5) {
      this.answer = "Erinomainen";
    }
    this.value = value;
  }
}

