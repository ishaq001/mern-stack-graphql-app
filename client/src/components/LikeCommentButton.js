import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { LIKE_COMMENT_MUTATION } from "../graphqlOperations";
import { MyPopup } from "../utils/popup";

export function LikeCommentButton({
  comment: { id, commentLikes, commentLikesCount },
  postId,
  user,
  refetch,
}) {
  const [liked, setLiked] = useState(false);

  const [likeComment] = useMutation(LIKE_COMMENT_MUTATION, {
    variables: { postId: postId, commentId: id },
    onCompleted: () => refetch(),
  });

  useEffect(() => {
    if (user && commentLikes?.find((like) => like.email === user.email)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, commentLikes]);

  const LikeButton = user ? (
    <Button color="teal" basic={!liked && true}>
      <Icon name="heart" />
    </Button>
  ) : (
    <Button as={Link} to="/login" color="pink">
      <Icon name="login" />
    </Button>
  );

  return (
    <MyPopup content={liked ? "Unlike Comment" : "Like Comment"}>
      <Button as="div" labelPosition="right" onClick={likeComment}>
        {LikeButton}
        <Label basic color="teal" pointing="left">
          {commentLikesCount}
        </Label>
      </Button>
    </MyPopup>
  );
}
