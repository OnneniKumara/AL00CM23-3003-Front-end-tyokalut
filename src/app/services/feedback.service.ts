import {Injectable, signal} from '@angular/core';
import {Question} from '../models/Question/question';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor() {
  }

  // kysymykset
  private questionsSignal = signal<Question[]>([
    new Question("Kuinka hyvin ymmärsit kurssin sisällön?"),
    new Question("Kuinka hyvin pystyit soveltamaan oppimaasi käytäntöön?"),
    new Question("Kuinka hyvin opit kurssin omista materiaaleista?")
  ]);

  // Palauttaa kysymykset
  getQuestions() {
    return this.questionsSignal.asReadonly();
  }

  // Päivitys kysymyksen
  updateQuestion(index: number, updatedQuestion: Question) {
    const currentQuestions = [...this.questionsSignal()];
    currentQuestions[index] = updatedQuestion;
    this.questionsSignal.set(currentQuestions);
  }

  // Lisää uuden kysymyksen
  addQuestion(question: Question) {
    this.questionsSignal.update(questions => [...questions, question]);
  }

  // Poistaa kysymyksen
  removeQuestion(index: number) {
    const currentQuestions = [...this.questionsSignal()];
    currentQuestions.splice(index, 1);
    this.questionsSignal.set(currentQuestions);
  }
}
