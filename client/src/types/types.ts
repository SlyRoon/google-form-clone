

export interface AnswerData {
  questionId: string;
  value: string[];
}

export interface ResponseData {
  id: string;
  formId: string;
  answers: AnswerData[];
}

export interface QuestionData {
  id: string;
  title: string;
  type: string;
  options?: string[] | null;
  correctAnswers?: string[] | null;
}
export interface FormSummary {
  id: string;
  title: string;
  description?: string | null;
}