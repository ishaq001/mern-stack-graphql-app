import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";

import { useForm } from "../utils/customHooks/UserFormHook";
import { CREATE_POST_MUTATION } from "./../graphqlOperations/";

export function PostForm({ refetch }) {
  const { values, onSubmit, onChange } = useForm(createPostCallback, {
    body: "",
  });

  const [error, setError] = useState("");

  const [createPost] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    onCompleted: () => {
      values.body = "";
      refetch();
    },
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create Post</h2>
        <Form.Field>
          <Form.Input
            placeholder="Hello World!!!"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type="submit" color="teal">
            Post
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: "20px" }}>
          <ul className="list">
            <li>{error}</li>
          </ul>
        </div>
      )}
    </>
  );
}
