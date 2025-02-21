import {Question} from './question';

describe('Question', () => {
  it('should create an instance', () => {
    const questionData = {
      // Provide the necessary properties expected by the Question constructor
      id: 1,
      text: 'Sample question',
      value: 0,
      answer: ''
    };
    expect(new Question(questionData.text)).toBeTruthy();
  });
});
