import React, { ReactElement } from "react";
// import { ContextUsername } from "../contexts/context-username";
import "./comments-show.css";

interface Props {
  comments: string;
  username: string;
}

export default function CommentsShow({comments, username}: Props): ReactElement {
//   const username = useContext(ContextUsername);

  return (
    <>
      <hr />
      <div className="comments">
        <span className="little">{username}</span>
        <p>{comments}</p>
      </div>
    </>
  );
}
