
import {forms , responses} from '../../db/database'
import {v4 as uuidv4} from 'uuid'


export const mutationResolver = {
    createForm: (_: any , args: {title: string ,description?: string , questions: any[] }) => {
        const newForm = {
            id: uuidv4(),
            title: args.title,
            description: args.description,
            questions: args.questions.map(q => ({id: uuidv4(),
                ...q
            }))
            
        }
        forms.push(newForm)
        return newForm
    },
    submitResponse: (_: any , args: {formId: string , answers: {questionId: string , value: string}[]}) => {
        const newResponse  = {
            id: uuidv4(),
            formId: args.formId,
            answers: args.answers
        }
        responses.push(newResponse)
        return newResponse
    }
}