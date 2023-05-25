import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/common/base/base.component';
import { Answer } from 'src/app/model/dto/answer/answer.model';
import { CategoryList } from 'src/app/model/dto/category/category-list.model';
import { Category } from 'src/app/model/dto/category/category.model';
import { Question } from 'src/app/model/dto/question/question.model';
import { QuestionsFilter } from 'src/app/model/filters/questions-filter.model';
import { CategoryService } from 'src/app/services/category/category.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { QuestionService } from 'src/app/services/questions/question.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent extends BaseComponent implements OnInit {
  filter!: QuestionsFilter;

  categoryList!: Array<Category>;
  questionList!: Array<Question>;

  showSubmit: boolean = false;

  constructor(
    private catService: CategoryService,
    private questionService: QuestionService,
    private loadService: LoaderService
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadCategories();
    this.initializeFilter();
  }

  loadCategories(): void {
    let catSubscr = this.catService.getCategories().subscribe((result) => {
      if (result) {
        this.categoryList = result.trivia_categories;
      }
      this.loadService.stopLoad();
      catSubscr.unsubscribe();
    });
  }

  initializeFilter(): void {
    this.filter = new QuestionsFilter();
    this.filter.amount = 5;
    this.filter.type = 'multiple';
  }

  createQuiz(): void {
    let questSubscr = this.questionService
      .getQuestions(this.filter)
      .subscribe((result) => {
        if (result && result.response_code === 0) {
          this.questionList = result.results;
          this.mapAnswers();
        }
        this.loadService.stopLoad();
        questSubscr.unsubscribe();
      });
  }

  mapAnswers(): void {
    this.questionList.forEach((question) => {
      let id: number = 0;
      question.all_answers = question.incorrect_answers.map(
        (answer: string) => {
          return new Answer(id++, answer, false, false);
        }
      );
      question.all_answers.push(
        new Answer(id++, question.correct_answer, false, true)
      );

      question.all_answers = this.shuffleAnswers(question.all_answers);
    });
  }

  shuffleAnswers(unshuffledAnswers: Array<Answer>): Array<Answer> {
    return unshuffledAnswers
      .map((answer: Answer) => ({ answer, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ answer }) => answer);
  }

  toggleAnswer(question: Question, answerId: number): void {
    question.all_answers?.forEach((answer: Answer) => {
      if (answer.id === answerId) {
        answer.checked = !answer.checked;
      } else {
        answer.checked = false;
      }
    });

    this.checkSubmission();
  }

  checkSubmission(): void {

    let unasweredQuestions: Array<Question> = this.questionList.filter((question: Question) =>
      question.all_answers?.filter((answer: Answer) => answer.checked).length === 0
    );

    this.showSubmit = unasweredQuestions.length === 0;
  }
}
