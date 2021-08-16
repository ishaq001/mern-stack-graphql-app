import React from "react";
import { Popup } from "semantic-ui-react";

export function MyPopup({ content, children }) {
  return <Popup inverted content={content} trigger={children} />;
}
