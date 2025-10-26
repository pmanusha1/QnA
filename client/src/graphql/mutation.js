import { gql } from "@apollo/client";

export const GET_QUESTIONS = gql`
    query {
        questions {
            id
            title
            body
            author {
                name
            }
        }
    }
`;

export const GET_QUESTION = gql`
    query GetQuestion($id: ID!) {
        question(id: $id) {
            id
            title
            body
            author {
                name
            }
            answers {
                id
                body
                author {
                    name
                }
            }
            comments {
                id
                body
                author {
                    name
                }
            }
        }
    }
`;


export const CREATE_QUESTION = gql`
  mutation CreateQuestion($title: String!, $body: String!) {
    createQuestion(title: $title, body: $body) {
      id
      title
      body
      author {
        name
      }
    }
  }
`;

export const CREATE_ANSWER = gql`
  mutation CreateAnswer($body: String!, $questionId: ID!) {
    createAnswer(body: $body, questionId: $questionId) {
      id
      body
      author {
        id
        name
      }
    }
  }
`;

export const CREATE_COMMENT_ON_QUESTION = gql`
  mutation CreateCommentOnQuestion($body: String!, $questionId: ID!) {
    createCommentOnQuestion(body: $body, questionId: $questionId) {
      id
      body
      author { id name }
      createdAt
    }
  }
`;

export const CREATE_COMMENT_ON_ANSWER = gql`
  mutation CreateCommentOnAnswer($body: String!, $answerId: ID!) {
    createCommentOnAnswer(body: $body, answerId: $answerId) {
      id
      body
      author { id name }
      createdAt
    }
  }
`;

