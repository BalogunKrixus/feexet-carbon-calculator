export interface Question {
  id: string;
  category: string;
  text: string;
  options: {
    text: string;
    value: number;
  }[];
}

export interface CategoryScore {
  category: string;
  score: number;
  maxScore: number;
}

export interface CalculatorState {
  currentQuestionIndex: number;
  answers: Record<string, number>;
  categoryScores: Record<string, number>;
  activeCategory: string;
}