export enum QuestionType {
  TEXT = 'TEXT',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  CHECKBOX = 'CHECKBOX',
  DATE = 'DATE'
}

export interface Question {
  id: string;
  type: QuestionType;
  label: string;
  options?: string[]; 
}

export interface Form {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

export interface Answer {
  questionId: string;
  value: string;
}

export interface FormResponse {
  id: string;
  formId: string;
  answers: Answer[];
}
export interface CreateFormArgs {
  title: string;
  description?: string;
  questions: Omit<Question, 'id'>[];
}

export interface SubmitResponseArgs {
  formId: string;
  answers: Answer[];
}