import {Component, effect, inject} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {Question} from '../../../models/Question/question';
import {FeedbackService} from '../../../services/feedback.service';
import {NgIf} from '@angular/common';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-adminpanel',
  standalone: true,
  imports: [
    MatTableModule,
    NgIf,
    MatInput,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './adminpanel.component.html',
  styleUrl: './adminpanel.component.css'
})
export class AdminpanelComponent {
  displayedColumns: string[] = ['name', 'actions'];
  editingIndex: number | null = null;
  editedQuestion: Question | null = null;
  questions: Question[] = [];

  // tuodaan router käyttöön
  router = inject(Router);

  constructor(private qData: FeedbackService) {
    // Käytetään effectiä, jotta saadaan päivitetty lista kysymyksistä
    effect(() => {
      // kutsutaan getQuestions metodia, joka palauttaa kysymykset
      this.questions = this.qData.getQuestions()();
    });
  }

  startEditing(question: Question, index: number): void {
    this.editingIndex = index;
    // luodaan uusi kysymys, joka saa arvokseen kysymyksen tekstin
    this.editedQuestion = new Question(question.questionText);
  }

  saveEdit(): void {
    if (this.editingIndex !== null && this.editedQuestion) {
      this.qData.updateQuestion(this.editingIndex, this.editedQuestion);
      this.editingIndex = null;
      this.editedQuestion = null;
    }
  }

  cancelEdit(): void {
    this.editingIndex = null;
    this.editedQuestion = null;
  }
}
