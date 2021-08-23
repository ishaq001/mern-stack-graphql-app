import React from "react";
import moment from "moment";
import { Card } from "semantic-ui-react";

export function UserCard({ username, createdAt, body }) {
  return (
    <Card.Content>
      <Card.Header>{username}</Card.Header>
      <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
      <Card.Description>{body}</Card.Description>
    </Card.Content>
  );
}
