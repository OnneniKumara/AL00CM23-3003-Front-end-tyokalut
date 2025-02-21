import {Component} from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {NgForOf, NgIf} from '@angular/common';
import {Question} from '../../Models/Question/question';
import {MatButton} from '@angular/material/button';

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
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {

  // jos true, näytetään komponentin admin-ominaisuudet
  admin: boolean = false;

  questions: Array<Question> = [
    new Question("Kuinka hyvin ymmärsit kurssin sisällön?"),
    new Question("Kuinka hyvin pystyit soveltamaan oppimaasi käytäntöön?"),
    new Question("Kuinka hyvin opit kurssin omista materiaaleista?")
  ]
  protected readonly Question = Question;

  onSliderChange(event: any, value: number, question: Question): void {
    question.answer = question.setFeedback(value);
    console.log(question, question.answer, event.value, value);
  }

  resetSliders(): void {
    this.questions.forEach(question => {
      question.value = 0; // Reset value to 0
      question.answer = "Ei Vielä Arvosteltu"; // Reset answer to default"
    });
  }
}
