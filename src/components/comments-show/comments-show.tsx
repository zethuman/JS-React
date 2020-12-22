import React, { ReactElement } from "react";
// import { ContextUsername } from "../contexts/context-username";
import classes from "./comments-show.module.css";

interface Props {
  comments: string;
  username: string;
}

export default function CommentsShow({comments, username}: Props): ReactElement {
//   const username = useContext(ContextUsername);

  return (
    <>
      <hr />
      <div className={classes.comments}>
        <span className={classes.little}> {username} </span>
        <p>{comments}</p>
      </div>
    </>
  );
}
