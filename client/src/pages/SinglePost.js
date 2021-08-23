import React, { useContext, useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Button, Card, Grid, Image } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import {
  CommentsButton,
  DeleteButton,
  LikeButton,
  LikeCommentButton,
  UserCard,
} from "../components";
import {
  CREATE_COMMENT_MUTATION,
  FETCH_SINGLE_POST,
} from "../graphqlOperations";

export function SinglePost(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  const inputTypeRef = useRef(null);
  const [commentBody, setCommentBody] = useState("");

  const {
    data: singlePost,
    loading,
    refetch,
  } = useQuery(FETCH_SINGLE_POST, {
    variables: {
      postId,
    },
  });

  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    variables: {
      postId,
      body: commentBody,
    },
    onCompleted: () => {
      setCommentBody("");
      inputTypeRef.current.blur();
      refetch();
    },
  });

  let markup;
  if (loading) {
    markup = <p>Loading post ...</p>;
  } else {
    const {
      createdAt,
      id,
      username,
      body,
      email,
      comments,
      likes,
      commentCount,
      likeCount,
    } = singlePost?.getPost;

    function returnToHomepage() {
      props.history.push("/");
    }

    function handleChange(event) {
      setCommentBody(event.target.value);
    }

    markup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              size="small"
              floated="right"
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            />
          </Grid.Column>
          <Grid.Column width={12}>
            <Card fluid>
              <UserCard username={username} body={body} createdAt={createdAt} />
              <hr />
              <Card.Content extra>
                <LikeButton
                  refetch={refetch}
                  user={user}
                  post={{ id, likeCount, likes }}
                />

                <CommentsButton id={id} commentCount={commentCount} />
                {user && user.email === email && (
                  <DeleteButton postId={postId} callback={returnToHomepage} />
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a comment</p>
                  <div className="ui action input fluid">
                    <input
                      type="text"
                      placeholder="Comment..."
                      name="comment"
                      value={commentBody}
                      onChange={handleChange}
                      ref={inputTypeRef}
                    />
                    <Button
                      type="submit"
                      className="ui button teal"
                      disabled={commentBody.trim() === ""}
                      onClick={createComment}
                    >
                      Comment
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            )}

            {comments.map((comment) => (
              <Card fluid>
                {user && user?.username === comment?.username && (
                  <DeleteButton postId={id} commentId={comment?.id} />
                )}
                <UserCard
                  username={comment.username}
                  body={comment.body}
                  createdAt={comment.createdAt}
                 
                />
                <Card.Content extra>
                  <LikeCommentButton
                    comment={{
                      id: comment.id,
                      commentLikes: comment.commentLikes,
                      commentLikesCount: comment.commentLikesCount,
                    }}
                    postId={id}
                    user={user}
                    refetch={refetch}
                  />
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return markup;
}
let input1 = document.getElementById('myInput1');
  var input2 = document.getElementById('myInput2');

  input1.addEventListener('change', function() {
  
    let today = new Date();
    let currentYear = today.getFullYear() ;
    let age = parseInt(document.getElementById('age').value, 10);
    let birthYear = currentYear - age
    let inputNewValue = input1.value
    inputNewValue = `${birthYear}-01-01`
    input2.value = inputNewValue;
  });


            document.getElementById('calculate').addEventListener('click', function(e){
               e.preventDefault();
               var today = new Date();
               var currentYear = today.getFullYear() ;
               var age = parseInt(document.getElementById('age').value, 10);
              var birthYear = currentYear - age;
              
               document.getElementById('result').innerHTML =  
 birthYear;  
           });