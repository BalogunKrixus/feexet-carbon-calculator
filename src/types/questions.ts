export type Question = {
  id: string;
  category: string;
  text: string;
  hint: string;
  options: {
    text: string;
    value: number;
  }[];
};

export type CategoryScore = {
  category: string;
  score: number;
};