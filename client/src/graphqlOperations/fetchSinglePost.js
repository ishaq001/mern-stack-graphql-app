import gql from "graphql-tag";

export const FETCH_SINGLE_POST = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      email
      likeCount
      likes {
        email
      }
      comments {
        id
        email
        createdAt
        body
        username
        commentLikes {
          id
          username
          email
        }
        commentLikesCount
      }
      commentCount
    }
  }
`;
