import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      email
      username
      likeCount
      likes {
        username
        email
      }
      commentCount
      comments {
        id
        username
        email
        createdAt
        body
      }
    }
  }
`;
