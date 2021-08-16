import gql from "graphql-tag";

export const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        body
        createdAt
        email
        id
        username
      }
      commentCount
    }
  }
`;
