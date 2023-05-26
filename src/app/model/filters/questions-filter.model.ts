import { constants } from "src/app/utils/constants";

export class QuestionsFilter {
  amount!: number;
  category!: number;
  difficulty!: string;
  type!: string;

  constructor() {
    this.amount = 5;
    this.type = "multiple";
    this.difficulty = "";
    this.category = constants.defValues.defaultCategory;
  }
}
