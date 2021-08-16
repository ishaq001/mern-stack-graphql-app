import gql from "graphql-tag";

export const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      email
      likes {
        id
        createdAt
        username
        email
      }
      comments {
        id
        createdAt
        username
        email
        body
      }
      likeCount
      commentCount
    }
  }
`;
