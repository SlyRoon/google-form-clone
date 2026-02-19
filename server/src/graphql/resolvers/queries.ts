import {forms , responses} from '../../db/database';
import { Form, FormResponse } from '../../types/types';

export const queryResolvers = {
  forms: (): Form[] => {
    return forms;
  },
  
  form: (_: unknown, args: { id: string }): Form | undefined => {
    return forms.find((f) => f.id === args.id);
  },
  
  responses: (_: unknown, args: { formId: string }): FormResponse[] => {
    return responses.filter((r) => r.formId === args.formId);
  }
};