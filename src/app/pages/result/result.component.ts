import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/common/base/base.component';
import { Answer } from 'src/app/model/dto/answer/answer.model';
import { Question } from 'src/app/model/dto/question/question.model';
import { Score } from 'src/app/model/dto/score/score.model';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent extends BaseComponent implements OnInit {


  questionList!: Array<Question>;

  score!: Score;

  showScore: boolean = false;

  constructor(private navService: NavigationService) {
    super();
  }

  ngOnInit(): void {
    this.initializeResults();
  }

  initializeResults(): void {

    this.questionList = new Array<Question>();

    let questionString: string | null = this.navService.getSessionData(this.constants.dataKeys.question);

    if(questionString) {
      this.questionList = JSON.parse(questionString);
      this.initilizeScore();
    }

  }

  initilizeScore(): void {

    this.score = new Score();

    this.score.maxPoints = this.questionList.length;

    this.questionList.forEach((question: Question) =>  {

      question.all_answers?.forEach((answer: Answer) => {

        if(answer.checked && answer.correct) {
          this.score.points++;
        }

      });

    });

    this.showScore = true;
  }

  getAnswerClass(answer: Answer): string {

    let answerClass: string = "btn btn-outline-success";

    if(answer.correct) {

      answerClass = "btn btn-success";

    } else if(answer.checked) {
      answerClass = "btn btn-danger";
    }

    answerClass += " answer-button";

    return answerClass;
  }

  getScoreClass(): string {

    let scoreClass: string = "";

    let points: number = this.score.points;

    if (points > 3) {

      scoreClass = "great-score";

    } else if(points > 1) {

      scoreClass = "avarage-score";

    } else {

      scoreClass = "bad-score";

    }

    return scoreClass;
  }

  getScoreMessage(): string {

    let scoreMessage: string = this.constants.labels.score;

    scoreMessage = scoreMessage.replace("{1}", this.score.points.toString()).replace("{2}", this.score.maxPoints.toString());

    return scoreMessage;

  }

  createNewQuiz(): void {
    this.navService.removeFromSessionData(this.constants.dataKeys.question);
    this.navService.navigate([this.endpoints.local.home]);
  }
}
