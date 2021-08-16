import gql from "graphql-tag";

export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        email
        createdAt

        body
      }
      commentCount
    }
  }
`;
