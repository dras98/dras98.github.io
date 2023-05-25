import { Difficulty } from "../model/dto/difficulty/difficulty.model";

export const constants = {
  titles: {
    home: "QUIZ MAKER",
    result: "RESULTS"
  },
  placeholders: {
    selectCategory: "Select a category",
    selectDifficulty: "Select a difficulty"
  },
  buttons: {
    create: "Create",
    submit: "Submit",
    back: "Back",
    createNewQuiz: "Create a new Quiz",
    home: "Home"
  },
  labels: {
    score: "You scored {1} out of {5}"
  }
};

export const difficulties: Array<Difficulty> = [
  {
    value: "easy",
    description: "Easy"
  },
  {
    value: "medium",
    description: "Medium"
  },
  {
    value: "hard",
    description: "Hard"
  }
];

export const endpoint = {
  local: {
    home: "/home/",
    results: "/results/",
    error: "/error/"
  },
  external: {
    category: "https://opentdb.com/api_category.php",
    questions: "https://opentdb.com/api.php"
  }
};
