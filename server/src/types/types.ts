export type QuestionType = 'TEXT' | 'MULTIPLE_CHOICE' | 'CHECKBOX' | 'DATE'

export interface Question {
    id: string;
    type: QuestionType;
    title: string;
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
    value: string | string[];
}

export interface Response {
    id: string;
    formId: string
    answers: Answer[]
}