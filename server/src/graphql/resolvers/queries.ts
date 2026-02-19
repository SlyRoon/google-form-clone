import {forms , responses} from '../../db/database';

export const queryResolvers = {
    forms: () => {
        return forms
    },
    form: (_: any , args: {id: string}) => {
        return forms.find((f) => f.id === args.id)
    },
    responses: (_: any , args: {formId: string}) => {
        return responses.filter((r) => r.formId === args.formId)
    }
}