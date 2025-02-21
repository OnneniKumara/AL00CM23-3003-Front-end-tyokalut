import {Injectable} from '@angular/core';
import {Question} from '../models/Question/question';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor() {
  }

  // kysymykset
  questions: Array<Question> = [
    new Question("Kuinka hyvin ymmärsit kurssin sisällön?"),
    new Question("Kuinka hyvin pystyit soveltamaan oppimaasi käytäntöön?"),
    new Question("Kuinka hyvin opit kurssin omista materiaaleista?")
  ]

  // palauttaa kysymykset
  getQuestions() {
    return this.questions;
  }
}
