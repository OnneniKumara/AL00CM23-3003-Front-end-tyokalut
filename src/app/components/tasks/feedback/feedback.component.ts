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
    FeedbackService,
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
  questions: Array<Question> = this.feedbackService.getQuestions();

  protected readonly Question = Question;

  onSliderChange(event: any, value: number, question: Question): void {
    question.answer = question.setFeedback(value);
    console.log(question, question.answer, event.value, value);
  }

  resetSliders(): void {
    this.questions.forEach(question => {
      question.value = 0; // Reset value to 0
      question.answer = "Ei Vielä Arvosteltu";
    });
    // kutsutaan PopUpServiceä
    this.popUpService.openDialog("Palautteet nollattu");
  }
}
