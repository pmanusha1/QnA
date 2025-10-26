import { gql } from 'graphql-tag'

export const typeDefs = gql`
type User {
    id: ID!
    name: String!
    email: String!
    questions: [Question!]
}

type Question {
    id: ID!
    title: String!
    body: String!
    author: User!
    answers: [Answer!]
    comments: [Comment!]
}

type Answer {
    id: ID!
    body: String!
    author: User!
    question: Question!
    comments: [Comment!]
}

type Comment {
    id: ID!
    body: String!
    author: User!
    question: Question
    answer: Answer
    createdAt: String!
}

type AuthPayload {
    token: String!,
    user: User!
}

type Query {
    users: [User!]
    questions: [Question!]
    question(id: ID!): Question
}

type Mutation {
    createUser(name: String!, email: String!): User!
    createQuestion(title: String!, body: String!): Question!
    createAnswer(body: String!, questionId: ID!): Answer!
    createCommentOnQuestion(body: String!, questionId: ID!): Comment!
    createCommentOnAnswer(body: String!, answerId: ID!): Comment!
}

extend type Mutation {
    register(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
}
`
