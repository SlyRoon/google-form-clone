import { v4 as uuidv4 } from 'uuid';
import { forms, responses } from '../../db/database';
import { Form, FormResponse, CreateFormArgs, SubmitResponseArgs } from '../../types/types';

export const mutationResolver = {
  createForm: (_: unknown, args: CreateFormArgs): Form => {
    const newForm: Form = {
      id: uuidv4(),
      title: args.title,
      description: args.description,
      questions: args.questions.map(q => ({ ...q, id: uuidv4() }))
    };
    forms.push(newForm);
    return newForm;
  },

  submitResponse: (_: unknown, args: SubmitResponseArgs): FormResponse => {
    const newResponse: FormResponse = {
      id: uuidv4(),
      formId: args.formId,
      answers: args.answers
    };
    responses.push(newResponse);
    return newResponse;
  }
};