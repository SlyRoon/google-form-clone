export const typeDefs = `#graphql
  type Question {
    id: ID!
    type: String!
    title: String!
    options: [String!]
    correctAnswers: [String!] 
  }

  type Form {
    id: ID!
    title: String!
    description: String
    questions: [Question!]!
  }

  type Answer {
    questionId: ID!
    value: [String!]!
  }

  type Response {
    id: ID!
    formId: ID!
    answers: [Answer!]!
  }

  input QuestionInput {
    type: String!
    title: String!
    options: [String!]
    correctAnswers: [String!] 
  }

  input AnswerInput {
    questionId: ID!
    value: [String!]!
  }

  type Query {
    forms: [Form!]!
    form(id: ID!): Form
    responses(formId: ID!): [Response!]!
  }

  type Mutation {
    createForm(title: String!, description: String, questions: [QuestionInput]): Form!
    submitResponse(formId: ID!, answers: [AnswerInput]): Response!
  }
`;