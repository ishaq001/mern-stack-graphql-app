import gql from "graphql-tag";

export const LIKE_COMMENT_MUTATION = gql`
  mutation likeComment($postId: ID!, $commentId: ID!) {
    likeComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        email
        commentLikes {
          email
          id
          username
          createdAt
        }
        commentLikesCount
      }
    }
  }
`;
