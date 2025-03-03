import {Component, inject} from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {NgForOf, NgIf} from '@angular/common';
import {Question} from '../../../models/Question/question';
import {MatButton} from '@angular/material/button';
import {FeedbackService} from '../../../services/feedback.service';
import {PopUpService} from '../../../services/pop-up.service';

@Component({
  selector: 'app-feedback',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatSliderModule,
    NgIf,
    NgForOf,
    MatButton,
  ],
  providers: [
    PopUpService
  ],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {

  // jos true, näytetään komponentin admin-ominaisuudet
  admin: boolean = false;

  // PopUpService
  private popUpService = inject(PopUpService);

  // FeedbackService
  private feedbackService = inject(FeedbackService);

  // kysymykset service-luokasta
  questions = this.feedbackService.getQuestions();

  protected readonly Question = Question;

  onSliderChange(event: any, value: number, question: Question): void {
    question.answer = question.setFeedback(value);
    console.log(question, question.answer, event.value, value);
  }

  // nollaus
  resetSliders(): void {
    const currentQuestions = this.questions();
    currentQuestions.forEach((question, index) => {
      const resetQuestion = new Question(question.questionText);
      this.feedbackService.updateQuestion(index, resetQuestion);
    });

    // kutsutaan PopUpServiceä
    this.popUpService.openDialog("Palautteet nollattu");
  }
}
