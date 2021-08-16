import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { LIKE_POST_MUTATION } from "../graphqlOperations";
import { MyPopup } from "../utils/popup";

export function LikeButton({ post: { id, likes, likeCount }, user, refetch }) {
  const [liked, setLiked] = useState(false);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
    onCompleted: () => refetch(),
  });

  useEffect(() => {
    if (user && likes?.find((like) => like.email === user.email)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

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
    <MyPopup content={liked ? "Unlike Post" : "Like Post"}>
      <Button as="div" labelPosition="right" onClick={likePost}>
        {LikeButton}
        <Label basic color="teal" pointing="left">
          {likeCount}
        </Label>
      </Button>
    </MyPopup>
  );
}
