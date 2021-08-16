import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Confirm, Icon } from "semantic-ui-react";

import { DELETE_POST_MUTATION } from "../graphqlOperations/deletePost";
import {
  DELETE_COMMENT_MUTATION,
  FETCH_POSTS_QUERY,
} from "../graphqlOperations";
import { MyPopup } from "../utils/popup";

export function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { refetch } = useQuery(FETCH_POSTS_QUERY);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrMutation] = useMutation(mutation, {
    update: () => {
      setConfirmOpen(false);
      if (callback) {
        callback();
      }
    },
    variables: {
      postId,
      commentId,
    },
    onCompleted: () => {
      refetch();
    },
  });

  return (
    <>
      <MyPopup content={commentId ? "Delete Comment" : "Delete Post"}>
        <Button
          as="div"
          color="red"
          floated="right"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </MyPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrMutation}
      />
    </>
  );
}
